import { ChangeMiddleware } from "../types";
import { getMMDD } from "./utils";

const me: ChangeMiddleware = {
    type: "change",
    payload(selection, data) {
        let md = getMMDD(data.now);
        let result = "";
        switch (md) {
            case "0112": {
                result = "兔田佩克拉"; break;
            }
            case "0122": {
                result = "润羽露西娅"; break;
            }
            case "0214": {
                result = "癒月巧可"; break;
            }
            case "0222": {
                result = "猫又小粥"; break;
            }
            case "0305": {
                result = "樱巫女"; break;
            }
            case "0322": {
                result = "星街彗星"; break;
            }
            case "0402": {
                result = "不知火芙蕾雅"; break;
            }
            case "0422": {
                result = "天音彼方"; break;
            }
            case "0515": {
                result = "时乃空"; break;
            }
            case "0523": {
                result = "萝卜子"; break;
            }
            case "0606": {
                result = "角卷绵芽"; break;
            }
            case "0617": {
                result = "桐生可可"; break;
            }
            case "0702": {
                result = "大空昴"; break;
            }
            case "0722": {
                result = "夏色祭"; break;
            }
            case "0730": {
                result = "宝钟玛琳"; break;
            }
            case "0808": {
                result = "常暗永远"; break;
            }
            case "0810": {
                result = "赤井心"; break;
            }
            case "0820": {
                result = "大神澪"; break;
            }
            case "1001": {
                result = "戌神沁音"; break;
            }
            case "1005": {
                result = "白上吹雪"; break;
            }
            case "1010": {
                result = "姬森璐娜"; break;
            }
            case "1031": {
                result = "夜空梅露"; break;
            }
            case "1124": {
                result = "白银诺艾尔"; break;
            }
            case "1201": {
                result = "湊阿库娅"; break;
            }
            case "1208": {
                result = "紫咲诗音"; break;
            }
            case "1213": {
                result = "百鬼绫目"; break;
            }
        }

        if (result) {
            return {
                ended: true,
                name: result[0],
                rand: Math.random(),
                inherit: {
                    prefix: `${result[0]}生日快乐！`
                }
            };
        }
        return {
            ended: false,
            selections: selection
        };
    }
}

export default me;
