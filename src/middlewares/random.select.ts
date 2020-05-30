import { SelectMiddleware } from "../types";
const random = require("seedrandom")

function getRandomSeedBasedOnDate(date: Date) {
    return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
}

function getRngFromSeed(seed: string): number {
    return random(seed)();
}

const me: SelectMiddleware = {
    type: "select",
    payload(selection, data: any) {
        let dateSeed = getRandomSeedBasedOnDate(data.now);
        let rand = getRngFromSeed(dateSeed + data.userid + (data.query || ""));
        let powerTotal = Object.values(selection).reduce((a, b) => a + b);
        let targetPower = rand * powerTotal;
        let extras = data.extras || {};
        for (let [key, power] of Object.entries(selection)) {
            targetPower -= power;
            if (targetPower <= 0) return [key, rand, extras];
        }
        return [Object.keys(selection)[0], rand, extras];
    }
}

export default me;