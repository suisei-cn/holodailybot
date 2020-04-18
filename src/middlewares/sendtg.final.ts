import { FinalMiddleware } from "../types";
const fetch = require("node-fetch");
const BOT_KEY = process.env.TELEGRAM_BOT_KEY;

const me: FinalMiddleware = {
    type: "final",
    payload(result, data: any) {
        fetch(
            `https://api.telegram.org/bot${BOT_KEY}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    chat_id: data.chatid,
                    text: `${data.username} 的结果是： ${result}`,
                    parse_mode: "markdown"
                }),
            }
        );
    }
}

export default me;