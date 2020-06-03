import { MutationMiddleware } from "../types";
import vtuberCNInfo from "../vtuberInfo.cn";

const me: MutationMiddleware = {
    type: "mutate",
    payload(selections, data) {
        let message = data.message.message.text || "";
        if (data.message.inline_query) {
            message = data.message.inline_query.query;
        }
        if (message.toLowerCase().includes("+cn")) {
            for (const i of Object.keys(vtuberCNInfo)) {
                selections[i] = 1;
            }
        }
        return {};
    },
};

export default me;
