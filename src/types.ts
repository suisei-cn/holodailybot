export var BreakException = "f3caf30c-291c-44e3-983d-9c33b229968b";

export interface Selections {
    [key: string]: number;
}

export type SimpleSelectionResult = [string, number];
export type AdvancedSelectionResult = [string, number, any];

export type SelectionResult = SimpleSelectionResult | AdvancedSelectionResult;

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

type ChangeMiddlewareResponse = Selections | SelectionResult;

interface ChangePayload {
    (selections: Selections, data: EnvData): ChangeMiddlewareResponse
}

export interface ChangeMiddleware {
    type: "change";
    payload: ChangePayload;
}

interface SelectPayload {
    (selections: Selections, data: EnvData): SelectionResult
};

export interface SelectMiddleware {
    type: "select";
    payload: SelectPayload;
}

interface FinalPayload {
    (result: SelectionResult, data: EnvData): void | Object
}

export interface FinalMiddleware {
    type: "final";
    payload: FinalPayload;
}

export type PipelineMiddleware = InputMiddleware | MutationMiddleware | ChangeMiddleware | SelectMiddleware | FinalMiddleware;