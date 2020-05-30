import { InputMiddleware, Selections } from "../types";
import liverInfo from "../liverInfo";

const me: InputMiddleware = {
    type: "input",
    payload() {
        let info: Selections = {}
        for (const i of Object.keys(liverInfo)) {
            info[i] = 1;
        }
        return info;
    }
}

export default me;