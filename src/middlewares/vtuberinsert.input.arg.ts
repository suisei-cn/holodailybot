
import { InputMiddleware, Selections } from "../types";
import { ItemPickList } from "../types_list";

export default function me(list: ItemPickList) {
    return {
        type: "input",
        payload() {
            let info: Selections = {}
            for (const i of Object.keys(list)) {
                info[i] = 1;
            }
            return info;
        }
    } as InputMiddleware;
};