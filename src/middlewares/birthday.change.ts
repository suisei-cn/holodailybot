import { ChangeMiddleware } from "../types";
import { getMMDD } from "./utils";

const me: ChangeMiddleware = {
    type: "change",
    payload(selection, data: any) {
        let md = getMMDD(data.now);
        switch (md) {
            case "0322": {
                return ["星街彗星", Math.random()];
            }
            case "0422": {
                return ["天音彼方", Math.random()];
            }
            case "0515": {
                return ["时乃空", Math.random()];
            }
            case "0722": {
                return ["夏色祭", Math.random()];
            }
            case "0820": {
                return ["大神澪", Math.random()];
            }
            case "1005": {
                return ["白上吹雪", Math.random()];
            }
            case "1201": {
                return ["湊阿库娅", Math.random()];
            }
        }

        return selection;
    }
}

export default me;
