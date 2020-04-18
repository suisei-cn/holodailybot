import { SelectMiddleware } from "../types";

function includeOne(base: string, target: string[]) {
    for (const i of target) {
        if (base.includes(i)) return true;
    }
    return false;
}

function includeCount(base: string, target: string[]) {
    let cnt = 0;
    for (const i of target) {
        if (base.includes(i)) cnt++;
    }
    return cnt;
}

const me: SelectMiddleware = {
    type: "select",
    payload(selection, data: any) {
        let name = data.username;
        let state = Object.assign(selection);
        let suiCount = includeCount(name, ["sui", "sei", "彗星", "☄️", "tetris"]);
        if (suiCount > 0) {
            if (!state["星街彗星"]) state["星街彗星"] = 1;
            state["星街彗星"] *= 1.6 ** suiCount;
        }
        return state;
    }
}

export default me;