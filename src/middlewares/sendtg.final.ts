import { FinalMiddleware } from "../types";
import { giveInlineArticle, giveInlineVoice } from "./sendtg.utils";
const fetch = require("node-fetch");
const BOT_KEY = process.env.TELEGRAM_BOT_KEY;
import hololiverInfo from "../hololiverInfo";

const me: FinalMiddleware = {
    type: "final",
    payload(result, data: any) {
        if (!data.valid) return;
        let name = result[0];
        let rnd = result[1];
        // @ts-ignore: Element implicitly has an 'any' type
        let extraInfo = hololiverInfo[name] || [];
        let text = `今天是${data.now.getFullYear()}年${data.now.getMonth() + 1}月${data.now.getDate()}日，${data.username} 的幸运 Hololiver 是： ${name}！`;
        let cookie;
        if (extraInfo.length !== 0) {
            cookie = extraInfo[Math.floor(rnd * extraInfo.length)];
            if (typeof cookie === "string") {
                text += `\n今天的 Hololiver 语录：${cookie}`
            } else if (typeof cookie === "object") {
                switch (cookie.type) {
                    case "urlimage": {
                        text += `\n今天的 Hololiver 梗图：[\u200b](${cookie.payload})`;
                        break;
                    }
                    case "voice": {
                        if (cookie.payload)
                            text += `\n今天的 Hololiver 语录：${cookie.payload}`;
                        else
                            text += `\n今天的 Hololiver 语音：`;
                        break;
                    }
                }
            }
        }
        if (data.inline) {
            let inlineResult = giveInlineArticle(text);
            if (cookie && cookie.type == "voice") {
                inlineResult = giveInlineVoice(cookie.extra, text);
            }
            fetch(
                `https://api.telegram.org/bot${BOT_KEY}/answerInlineQuery`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        inline_query_id: String(data.id),
                        results: [inlineResult],
                        cache_time: 0
                    }),
                }
            );
        } else {
            if (cookie && cookie.type === "voice") {
                fetch(
                    `https://api.telegram.org/bot${BOT_KEY}/sendVoice`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({
                            chat_id: data.chatid,
                            voice: cookie.extra,
                            caption: text,
                            parse_mode: "markdown"
                        }),
                    }
                );
            } else {
                fetch(
                    `https://api.telegram.org/bot${BOT_KEY}/sendMessage`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({
                            chat_id: data.chatid,
                            text,
                            parse_mode: "markdown"
                        }),
                    }
                );
            }
        }
    }
}

export default me;