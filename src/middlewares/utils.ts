import { EnvData, ItemOptions } from "../types";

export function getMMDD(d: Date) {
    let month = String(d.getMonth() + 1),
        day = String(d.getDate());

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return month + day;
}