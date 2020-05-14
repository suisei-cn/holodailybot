import { ChangeMiddleware } from "../types";
import { getMMDD } from "./utils";

const me: ChangeMiddleware = {
    type: "change",
    payload(selection, data: any) {
        let md = getMMDD(data.now);
        let result: [string, number] | undefined;
        switch (md) {
            case "0112": {
                result = ["兔田佩克拉", Math.random()];
            }
            case "0122": {
                result = ["润羽露西娅", Math.random()];
            }
            case "0214": {
                result = ["癒月巧可", Math.random()];
            }
            case "0222": {
                result = ["猫又小粥", Math.random()];
            }
            case "0305": {
                result = ["樱巫女", Math.random()];
            }
            case "0322": {
                result = ["星街彗星", Math.random()];
            }
            case "0402": {
                result = ["不知火芙蕾雅", Math.random()];
            }
            case "0422": {
                result = ["天音彼方", Math.random()];
            }
            case "0515": {
                result = ["时乃空", Math.random()];
            }
            case "0523": {
                result = ["萝卜子", Math.random()];
            }
            case "0606": {
                result = ["角卷绵芽", Math.random()];
            }
            case "0617": {
                result = ["桐生可可", Math.random()];
            }
            case "0702": {
                result = ["大空昴", Math.random()];
            }
            case "0722": {
                result = ["夏色祭", Math.random()];
            }
            case "0730": {
                result = ["宝钟玛琳", Math.random()];
            }
            case "0808": {
                result = ["常暗永远", Math.random()];
            }
            case "0810": {
                result = ["赤井心", Math.random()];
            }
            case "0820": {
                result = ["大神澪", Math.random()];
            }
            case "1001": {
                result = ["戌神沁音", Math.random()];
            }
            case "1005": {
                result = ["白上吹雪", Math.random()];
            }
            case "1010": {
                result = ["姬森璐娜", Math.random()];
            }
            case "1031": {
                result = ["夜空梅露", Math.random()];
            }
            case "1124": {
                result = ["白银诺艾尔", Math.random()];
            }
            case "1201": {
                result = ["湊阿库娅", Math.random()];
            }
            case "1208": {
                result = ["紫咲诗音", Math.random()];
            }
            case "1213": {
                result = ["百鬼绫目", Math.random()];
            }
        }

        if (result) {
            return [...result, {
                prefix: `${result[0]}生日快乐！`
            }]
        }
        return selection;
    }
}

export default me;
