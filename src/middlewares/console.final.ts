import { FinalMiddleware } from "../types";

const me: FinalMiddleware = {
    type: "final",
    payload(result, data: any) {
        console.log(`${data.username} 的结果是： ${result}`);
    }
}

export default me;