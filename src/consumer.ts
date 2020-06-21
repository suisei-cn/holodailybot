import { ConsumeTarget, Chat, InlineQueryResult } from "./types";
import vAll from "./lists/vtuberInfo.full";
import { ItemPickText, ItemPick } from "./types_list";
import { tgSendMessage, tgSendVoice, answerInlineQuery } from "./util.tg";

const defaultPayload: ItemPickText = "";

function payloadExpander(payload: ItemPick): string {
    if (typeof payload === "string") {
        if (payload === "") return "";
        return "\n今日语录：" + payload;
    } else if (!payload.type) {
        return "";
    } else if (payload.type === "urlimage") {
        return `今日图片：<a href="${encodeURI(payload.payload)}">\u200b</a>`;
    } else if (payload.type === "voice") {
        return "今日语音：" + payload.payload;
    }
    return "";
}

export function consumeInlineResults(rets: ConsumeTarget[]) {
    let msgId = rets[0].result.env.message.inline_query.id;
    let results: InlineQueryResult[] = [];
    for (const ret of rets) {
        let text = (ret.result.options.prefix ? (ret.result.options.prefix + "\n") : "") + ret.text + "\n";
        let payload: ItemPick = defaultPayload;
        if (vAll[name]) {
            payload = vAll[name][Math.floor(ret.result.rand * vAll[name].length)] || "";
        }
        const payloadTarget = payloadExpander(payload);
        if (typeof payload === "string") {
            // Text payload
            results.push({
                type: "article",
                id: String(Math.random()),
                title: ret.title,
                input_message_content: {
                    message_text: text + payloadTarget,
                    parse_mode: "HTML"
                }
            });
        } else if (payload.type === "voice") {
            // Voice payload
            results.push({
                type: "voice",
                id: String(Math.random()),
                title: ret.title,
                voice_file_id: payload.extra,
                caption: text + payloadTarget,
                parse_mode: "HTML"
            });
        } else if (payload.type === "urlimage") {
            // Image payload
            results.push({
                type: "article",
                id: String(Math.random()),
                title: ret.title,
                input_message_content: {
                    message_text: text + payloadTarget,
                    parse_mode: "HTML"
                }
            });
        }
    }
    answerInlineQuery(msgId, results);
}

export function consumeMessageResult(ret: ConsumeTarget) {
    let text = (ret.result.options.prefix ? (ret.result.options.prefix + "\n") : "") + ret.text + "\n";
    let name = ret.result.name;
    let payload: ItemPick = defaultPayload;
    if (vAll[name]) {
        payload = vAll[name][Math.floor(ret.result.rand * vAll[name].length)] || "";
    }
    const payloadTarget = payloadExpander(payload);
    let chatId = (ret.result.env.chat as Chat).id;
    let msgId = ret.result.env.message.message.message_id;
    if (typeof payload === "string") {
        // Text payload
        tgSendMessage(chatId, text + payloadTarget, msgId);
    } else if (payload.type === "voice") {
        // Voice payload
        tgSendVoice(chatId, text + payloadTarget, payload.extra, msgId);
    } else if (payload.type === "urlimage") {
        // Image payload
        tgSendMessage(chatId, text + payloadTarget, msgId);
    }
}