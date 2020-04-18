import { FinalMiddleware } from "../types";
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
        let text = `今天是${data.now.getFullYear()}年${data.now.getMonth() + 1}月${data.now.getDate()}日，${data.username} 的幸运 Hololiver 是： ${name}`;
        if (extraInfo.length !== 0) {
            let cookie = extraInfo[Math.floor(rnd * extraInfo.length)];
            if (typeof cookie === "string") {
                text += `\n今天的 Hololiver 语录：${cookie}`
            } else if (typeof cookie === "object") {
                switch (cookie.type) {
                    case "urlimage": {
                        text += `\n今天的 Hololiver 梗图：[\u200b](${cookie.payload})`
                    }
                }
            }
        }
        if (data.inline) {
            fetch(
                `https://api.telegram.org/bot${BOT_KEY}/answerInlineQuery`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        inline_query_id: String(data.id),
                        results: [{
                            type: "article",
                            id: String(Math.random()) + String(Math.random()),
                            title: "告诉我吧！今天的幸运 Hololiver",
                            input_message_content: {
                                message_text: text,
                                parse_mode: "markdown"
                            }
                        }],
                        cache_time: 0
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

export default me;