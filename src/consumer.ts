import { ConsumeTarget, Chat, InlineQueryResult } from "./types";
import vAll from "./lists/vtuberInfo.full";
import { ItemPickText, ItemPick } from "./types_list";
import { tgSendMessage, tgSendVoice, answerInlineQuery } from "./util.tg";

const defaultPayload: ItemPickText = "";

export function consumeInlineResults(rets: ConsumeTarget[]) {
    let msgId = rets[0].result.env.message.inline_query.id;
    let results: InlineQueryResult[] = [];
    for (const ret of rets) {
        let text = (ret.result.options.prefix + "\n" || "") + ret.text + "\n";
        let payload: ItemPick = defaultPayload;
        if (vAll[name]) {
            payload = vAll[name][Math.floor(ret.result.rand * vAll[name].length)] || "";
        }
        if (typeof payload === "string") {
            // Text payload
            results.push({
                type: "article",
                id: String(Math.random()),
                title: ret.title,
                input_message_content: {
                    message_text: text + (payload !== "" ? "\n今日语录：" + payload : ""),
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
                caption: text + "\n今日语音：" + payload.payload,
                parse_mode: "HTML"
            });
        } else if (payload.type === "urlimage") {
            // Image payload
            results.push({
                type: "article",
                id: String(Math.random()),
                title: ret.title,
                input_message_content: {
                    message_text: `${text}\n今日图片：<a href="${encodeURI(payload.payload)}">\u200b</a>`,
                    parse_mode: "HTML"
                }
            });
        }
    }
    answerInlineQuery(msgId, results);
}

export function consumeMessageResult(ret: ConsumeTarget) {
    let text = (ret.result.options.prefix + "\n" || "") + ret.text + "\n";
    let name = ret.result.name;
    let payload: ItemPick = defaultPayload;
    if (vAll[name]) {
        payload = vAll[name][Math.floor(ret.result.rand * vAll[name].length)] || "";
    }
    let chatId = (ret.result.env.chat as Chat).id;
    let msgId = ret.result.env.message.message.message_id;
    if (typeof payload === "string") {
        // Text payload
        tgSendMessage(chatId, text + (payload !== "" ? "\n今日语录：" + payload : ""), msgId);
    } else if (payload.type === "voice") {
        // Voice payload
        tgSendVoice(chatId, text + "\n今日语音：" + payload.payload, payload.extra, msgId);
    } else if (payload.type === "urlimage") {
        // Image payload
        tgSendMessage(chatId, `${text}\n今日图片：<a href="${encodeURI(payload.payload)}">\u200b</a>`, msgId);
    }
}