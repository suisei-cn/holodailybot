import { Selections, PipelineMiddleware, ChangeMiddleware, EnvData, SelectMiddleware, BreakException, PromiseResult, PartialSelectionResult, SelectionResult, FinalMiddleware } from './types';
import { extractQuery } from './utils';

enum Steps {
    STEP_INPUT,
    STEP_CHANGE,
    STEP_FINAL
}

function exceptionHandler(e: any, body: any, data: any) {
    if (e === BreakException) return;
    console.error(`Exception happens: ${String(e)}\nCurrent body: ${JSON.stringify(body)}\nCurrent data: ${JSON.stringify(data)}`)
}

export class Pipeline {
    private pipelines: PipelineMiddleware[];

    constructor(pipelines: PipelineMiddleware[]) {
        this.pipelines = pipelines
    }

    public act(req: { body: any }, dataOverride: any = {}): PromiseResult {
        const body = req.body || {};
        if (typeof body !== 'object') {
            return {
                ok: false,
                ours: true,
                error: {
                    reason: 'Body is not an object',
                    body
                }
            };
        }
        if (!('message' in body) && !('inline_query' in body)) return {
            ok: false,
            ours: false,
            error: {
                reason: 'No body or inline_query there',
                body
            }
        };
        let step: Steps = Steps.STEP_INPUT;
        const query = extractQuery(body);
        if (query === undefined) {
            return {
                ok: false,
                ours: false,
                error: {
                    reason: 'No valid query',
                    body
                }
            }
        }
        let data: EnvData = {
            now: new Date(),
            message: (body as any),
            user: ('message' in body) ? (body as any).message.from : (body as any).inline_query.from,
            query,
            isInline: 'inline_query' in body,
            chat: (body as any)?.message?.chat
        }
        data = Object.assign(data, dataOverride);
        let selections: Selections = {};
        let result: PartialSelectionResult;
        let exitNow = false;
        for (const i of this.pipelines) {
            if (exitNow) break;
            switch (step) {
                case Steps.STEP_INPUT: {
                    if (i.type !== 'input') continue;
                    try {
                        selections = i.payload(data);
                    } catch (e) {
                        exceptionHandler(e, body, data);
                        return {
                            ok: false,
                            ours: true,
                            error: {
                                reason: 'Error on INPUT part',
                                body,
                                data,
                                error: e,
                            }
                        };
                    }
                    step = Steps.STEP_CHANGE;
                    break;
                }
                case Steps.STEP_CHANGE: {
                    if (i.type === 'change') {
                        try {
                            const ret = (i as ChangeMiddleware).payload(selections, data);
                            if (ret.ended) {
                                result = ret;
                                exitNow = true;
                                break;
                            } else {
                                selections = ret.selections;
                            }
                        } catch (e) {
                            exceptionHandler(e, body, data);
                            return {
                                ok: false,
                                ours: true,
                                error: {
                                    reason: 'Error on CHANGE part',
                                    body,
                                    data,
                                    error: e,
                                }
                            };
                        }
                    } else if (i.type === 'mutate') {
                        try {
                            data = Object.assign(data, i.payload(selections, data));
                        } catch (e) {
                            exceptionHandler(e, body, data);
                            return {
                                ok: false,
                                ours: true,
                                error: {
                                    reason: 'Error on MUTATE part',
                                    body,
                                    data,
                                    error: e,
                                }
                            };
                        }
                    } else if (i.type === 'select') {
                        try {
                            result = (i as SelectMiddleware).payload(selections, data);
                            exitNow = true;
                            break;
                        } catch (e) {
                            exceptionHandler(e, body, data);
                            return {
                                ok: false,
                                ours: true,
                                error: {
                                    reason: 'Error on SELECT part',
                                    body,
                                    data,
                                    error: e,
                                }
                            };
                        }
                    }
                }
            }
        }
        // Result is not generated
        // @ts-ignore
        if (!result) {
            return {
                ok: false,
                ours: true,
                error: {
                    reason: 'No results',
                    body,
                    data,
                }
            };
        }
        const realResult: SelectionResult = {
            ...result,
            ok: true,
            options: {
                ...result.inherit,
                username: data.user.first_name + (data.user.last_name || ''),
                date: data.now,
            },
            env: data
        }

        const dupRealResult = Object.assign({}, realResult);

        for (const i of this.pipelines.filter(x => x.type === 'final')) {
            (i as FinalMiddleware).payload(dupRealResult);
        }
        return realResult;
    }
}