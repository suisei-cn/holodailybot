import readline from "readline";
import { Pipeline } from "./main";

import VTuberInput from "./middlewares/vtuber.input"
import InfoMutation from "./middlewares/info.mutate"
import ExtMutation from "./middlewares/vtuberExt.mutate"
import BirthdayChange from "./middlewares/birthday.change"
import DebugChange from "./middlewares/debug.change"
import RandomSelection from "./middlewares/random.select"
import { getRandomSeedBasedOnDate } from "./middlewares/random.select"
import DebugFinal from "./middlewares/debug.final"

let written: any = {};

const pipeline = new Pipeline([
    VTuberInput,
    InfoMutation,
    ExtMutation,
    BirthdayChange,
    DebugChange,
    RandomSelection,
    DebugFinal((k: any) => {
        written = k;
    })
]);

const CALCULATE_FUTURE_THERESHOLD = 360 * 24 * 60 * 60 * 1000; // 1 year

function askGenerator(r: readline.Interface) {
    return async (question: string): Promise<string> => {
        return await new Promise((resolve) => {
            r.question(question, (ans) => {
                resolve(ans);
            });
        })
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const ask = askGenerator(rl);

(async () => {
    let id = -1;
    do {
        id = Number(await ask("Input your Telegram ID: "));
    } while (isNaN(id));
    let fullname = "";
    do {
        fullname = await ask("Input your Telegram name: ");
    } while (fullname === "");
    let vTuberExpected = "";
    do {
        vTuberExpected = await ask("Input your expected VTuber: ");
    } while (vTuberExpected === "");
    let now = Number(new Date());
    for (let i = now; i <= now + CALCULATE_FUTURE_THERESHOLD; i += 86400000) {
        pipeline.act(
            {
                body: {
                    // @ts-ignore
                    update_id: 1,
                    inline_query: {
                        id: 1,
                        from: {
                            id,
                            first_name: fullname,
                            last_name: ""
                        },
                        query: ""

                    }
                }
            },
            {
                now: new Date(i)
            }
        );
        if (written.result[0] === vTuberExpected) {
            console.log(`You are expected to have ${vTuberExpected} at ${getRandomSeedBasedOnDate(new Date(i)) + 100}.`);
            return;
        }
    }
    console.log(`You are not expected to have ${vTuberExpected} in ${CALCULATE_FUTURE_THERESHOLD / (24 * 60 * 60 * 1000)} days.`);
})();