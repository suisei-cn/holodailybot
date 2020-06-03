import { FinalMiddleware } from "../types";

export default function getDebugResults(cb: Function) {
    return {
        type: "final",
        payload(result, data: any) {
            cb({
                result,
                data
            });
        }
    } as FinalMiddleware;
};