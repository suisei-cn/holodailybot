import { FinalMiddleware, EnvData } from "../types";
import { getMMDD } from "./utils";
const fetch = require("node-fetch");
const BOT_KEY = process.env.TELEGRAM_BOT_KEY;
const ADMINCHAT_ID = process.env.TELEGRAM_ADMINCHAT_ID;

interface AnalyticData {
    [key: string]: number;
}

const localData = {
    analytics: ({} as AnalyticData),
    lastTime: ""
};

const me: FinalMiddleware = {
    type: "final",
    payload(result) {
        let name = result.name;
        if (localData.analytics[name]) {
            localData.analytics[name] += 1;
        } else {
            localData.analytics[name] = 1;
        }
        let mmdd = getMMDD(result.options.date);
        if (localData.lastTime == mmdd) return;
        let totalUsages = Object.values(localData.analytics).reduce((a, b) => a + b);
        localData.lastTime = mmdd;
        let text = `${mmdd}: ${totalUsages} gachas in total.\n`
        let sortedResults = Object.entries(localData.analytics).sort((b, a) => a[1] - b[1])
        for (const [key, value] of sortedResults) {
            text += `${key}: ${value} (${((value / totalUsages) * 100).toFixed(2)}%)\n`
        }
        text += "-----------------------------------\n";
        text += " A new day has started! Enjoy! ";
        console.log(text);
        if (ADMINCHAT_ID) {
            fetch(
                `https://api.telegram.org/bot${BOT_KEY}/sendMessage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        chat_id: ADMINCHAT_ID,
                        text,
                        parse_mode: "markdown"
                    }),
                }
            );
        }
        localData.analytics = {};
    }
}

export default me;