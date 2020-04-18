export interface Selections {
    [key: string]: number;
}

export interface EnvData {
    now: Date;
    message: any;
}

interface InputPayload {
    (data: EnvData): Selections
};

export interface InputMiddleware {
    type: "input";
    payload: InputPayload;
}

interface MutationPayload {
    (selections: Selections, data: EnvData): Object
}

export interface MutationMiddleware {
    type: "mutate";
    payload: MutationPayload;
}

type ChangeMiddlewareResponse = Selections | string;

interface ChangePayload {
    (selections: Selections, data: EnvData): ChangeMiddlewareResponse
}

export interface ChangeMiddleware {
    type: "change";
    payload: ChangePayload;
}

interface SelectPayload {
    (selections: Selections, data: EnvData): string
};

export interface SelectMiddleware {
    type: "select";
    payload: SelectPayload;
}

interface FinalPayload {
    (result: string, data: EnvData): void | Object
}

export interface FinalMiddleware {
    type: "final";
    payload: FinalPayload;
}

export type PipelineMiddleware = InputMiddleware | MutationMiddleware | ChangeMiddleware | SelectMiddleware | FinalMiddleware;