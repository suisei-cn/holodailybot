import { ChangeMiddleware } from "../types";
import { getMMDD } from "./utils";

const me: ChangeMiddleware = {
    type: "change",
    payload(selection, data: any) {
        let md = getMMDD(data.now);
        switch (md) {
            case "0112": {
                return ["兔田佩克拉", Math.random()];
            }
            case "0122": {
                return ["润羽露西娅", Math.random()];
            }
            case "0214": {
                return ["癒月巧可", Math.random()];
            }
            case "0222": {
                return ["猫又小粥", Math.random()];
            }
            case "0305": {
                return ["樱巫女", Math.random()];
            }
            case "0322": {
                return ["星街彗星", Math.random()];
            }
            case "0402": {
                return ["不知火芙蕾雅", Math.random()];
            }
            case "0422": {
                return ["天音彼方", Math.random()];
            }
            case "0515": {
                return ["时乃空", Math.random(), {
                    prefix: "时乃空生日快乐！"
                }];
            }
            case "0523": {
                return ["萝卜子", Math.random()];
            }
            case "0606": {
                return ["角卷绵芽", Math.random()];
            }
            case "0617": {
                return ["桐生可可", Math.random()];
            }
            case "0702": {
                return ["大空昴", Math.random()];
            }
            case "0722": {
                return ["夏色祭", Math.random()];
            }
            case "0730": {
                return ["宝钟玛琳", Math.random()];
            }
            case "0808": {
                return ["常暗永远", Math.random()];
            }
            case "0810": {
                return ["赤井心", Math.random()];
            }
            case "0820": {
                return ["大神澪", Math.random()];
            }
            case "1001": {
                return ["戌神沁音", Math.random()];
            }
            case "1005": {
                return ["白上吹雪", Math.random()];
            }
            case "1010": {
                return ["姬森璐娜", Math.random()];
            }
            case "1031": {
                return ["夜空梅露", Math.random()];
            }
            case "1124": {
                return ["白银诺艾尔", Math.random()];
            }
            case "1201": {
                return ["湊阿库娅", Math.random()];
            }
            case "1208": {
                return ["紫咲诗音", Math.random()];
            }
            case "1213": {
                return ["百鬼绫目", Math.random()];
            }
        }

        return selection;
    }
}

export default me;
