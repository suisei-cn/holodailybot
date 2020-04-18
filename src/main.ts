import { Selections, PipelineMiddleware, ChangeMiddleware, EnvData, SelectMiddleware } from "./types";

enum Steps {
    STEP_INPUT,
    STEP_CHANGE,
    STEP_FINAL
};

export class Pipeline {
    private pipelines: PipelineMiddleware[];

    constructor(pipelines: PipelineMiddleware[]) {
        this.pipelines = pipelines
    };

    public act(req: Request): number {
        let body = req.body;
        if (typeof body !== "object") {
            return 400;
        }
        let step: Steps = Steps.STEP_INPUT;
        let data: EnvData = {
            now: new Date(),
            message: (body as any)
        }
        let selections: Selections = {};
        let result: [string, number];
        for (const i of this.pipelines) {
            switch (step) {
                case Steps.STEP_INPUT: {
                    if (i.type !== "input") continue;
                    selections = i.payload(data);
                    step = Steps.STEP_CHANGE;
                    break;
                }
                case Steps.STEP_CHANGE: {
                    if (i.type === "change") {
                        let ret = (i as ChangeMiddleware).payload(selections, data);
                        if (typeof ret === "object" && typeof ret[0] === "string" && typeof ret[1] === "number") {
                            result = (ret as [string, number]);
                            step = Steps.STEP_FINAL;
                        } else {
                            selections = (ret as Selections);
                        }
                    } else if (i.type === "mutate") {
                        data = Object.assign(data, i.payload(selections, data));
                    } else if (i.type === "select") {
                        result = (i as SelectMiddleware).payload(selections, data);
                        step = Steps.STEP_FINAL;
                    }
                    break;
                }
                case Steps.STEP_FINAL: {
                    if (i.type !== "final") continue;
                    // @ts-ignore: Variable 'result' is used before being assigned.
                    let ret = i.payload(result, data);
                    if (ret !== undefined) {
                        data = Object.assign(data, ret);
                    }
                }
            }
        }
        return 200;
    }
};