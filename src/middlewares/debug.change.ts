import { ChangeMiddleware } from "../types";
import hololiverInfo from "../hololiverInfo";

const me: ChangeMiddleware = {
    type: "change",
    payload(selection, data: any) {

        let querySelector = data.query.split(" ");
        if (querySelector?.[0] == "!debug") {
            if (querySelector[1] && Object.keys(hololiverInfo).includes(querySelector[1])) {
                let targetNumber = Number(querySelector[2]);
                // @ts-ignore
                let targetLength = hololiverInfo[querySelector[1]].length;
                if (isNaN(targetNumber) || targetNumber >= targetLength) {
                    return [querySelector[1], Math.random(), {
                        prefix: "DEBUG MODE ON (PICK OUT OF BOUND)"
                    }]
                }
                return [querySelector[1], targetNumber / targetLength, {
                    prefix: "DEBUG MODE ON"
                }]
            }
        }

        return selection;
    }
}

export default me;
