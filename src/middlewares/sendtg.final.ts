import { FinalMiddleware } from "../types";
const fetch = require("node-fetch");
const BOT_KEY = process.env.TELEGRAM_BOT_KEY;

const me: FinalMiddleware = {
    type: "final",
    payload(result, data: any) {
        if (!data.valid) return;
        fetch(
            `https://api.telegram.org/bot${BOT_KEY}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    chat_id: data.chatid,
                    text: `今天是${data.now.getFullYear()}年${data.now.getMonth() + 1}月${data.now.getDate()}日，${data.username} 的幸运 Hololiver 是： ${result[0]}`,
                    parse_mode: "markdown"
                }),
            }
        );
    }
}

export default me;