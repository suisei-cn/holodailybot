import { Pipeline } from "./main";
import { ItemPickList } from "./types_list";

export var BreakException = "f3caf30c-291c-44e3-983d-9c33b229968b";

export interface Selections {
    [key: string]: number;
}

export interface SelectionsResult {
    ended: false;
    selections: Selections;
    inherit?: any;
}

export interface PartialSelectionResult {
    ended: true,
    name: string;
    rand: number;
    inherit?: any;
};

export interface SelectionResult extends PartialSelectionResult {
    options: ItemOptions
    env: EnvData
};

export type PromiseResult = SelectionResult | number;

interface User {
    id: number,
    first_name: string,
    last_name?: string
}

export interface Chat {
    id: number;
    type: string;
    title?: string;
    username?: string;
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
    id: string,
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
    user: User;
    chat?: Chat;
    query: string;
    isInline: boolean;
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

type ChangeMiddlewareResponse = SelectionsResult | PartialSelectionResult;

interface ChangePayload {
    (selections: Selections, data: EnvData): ChangeMiddlewareResponse
}

export interface ChangeMiddleware {
    type: "change";
    payload: ChangePayload;
}

interface SelectPayload {
    (selections: Selections, data: EnvData): PartialSelectionResult
};

export interface SelectMiddleware {
    type: "select";
    payload: SelectPayload;
}

interface FinalPayload {
    (result: SelectionResult): void | Object
}

export interface FinalMiddleware {
    type: "final";
    payload: FinalPayload;
}

export type PipelineMiddleware = InputMiddleware | MutationMiddleware | ChangeMiddleware | SelectMiddleware | FinalMiddleware;

export interface ItemOptions {
    username: string;
    date: Date;
    prefix?: string;
}

export interface Dicer {
    title: string;
    getText: ((result: SelectionResult) => string);
    procedures: Pipeline;
}

export interface ConsumeTarget {
    result: SelectionResult;
    title: string;
    text: string;
}

type ParseMode = "HTML" | "Markdown";

export interface InputTextMessageContent {
    message_text: string;
    parse_mode: ParseMode;
}

export interface InlineQueryResultArticle {
    type: "article";
    id: string;
    title: string;
    input_message_content: InputTextMessageContent
}

export interface InlineQueryResultCachedVoice {
    type: "voice";
    id: string;
    voice_file_id: string;
    title: string;
    caption?: string;
    parse_mode?: ParseMode;
}

export type InlineQueryResult = InlineQueryResultArticle |
    InlineQueryResultCachedVoice;