import { InputMiddleware, Selections } from "../types";
import hololiverInfo from "../hololiverInfo";

const me: InputMiddleware = {
    type: "input",
    payload() {
        let info: Selections = {}
        for (const i of Object.keys(hololiverInfo)) {
            info[i] = 1;
        }
        return info;
    }
}

export default me;