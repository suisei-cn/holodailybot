export var BreakException = "f3caf30c-291c-44e3-983d-9c33b229968b";

export interface Selections {
    [key: string]: number;
}

export type SimpleSelectionResult = [string, number];
export type AdvancedSelectionResult = [string, number, any];

export type SelectionResult = SimpleSelectionResult | AdvancedSelectionResult;

interface User {
    id: number,
    first_name: string,
    last_name?: string
}

export interface UpdateMessage {
    message_id: number,
    from: User,
    text?: string,
    chat: {
        id: number
    }
}

export interface UpdateInlineQuery {
    id: number,
    from: User,
    query: string
}

// @see https://core.telegram.org/bots/api#update
export type Update = {
    message: UpdateMessage,
    inline_query: UpdateInlineQuery
}

export interface EnvData {
    now: Date;
    message: Update;
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