import { InputMiddleware, Selections } from "../types";
import vtuberInfo from "../vtuberInfo";

const me: InputMiddleware = {
    type: "input",
    payload() {
        let info: Selections = {}
        for (const i of Object.keys(vtuberInfo)) {
            info[i] = 1;
        }
        return info;
    }
}

export default me;