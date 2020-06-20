import vHololive from "./lists/vtuberInfo.hololive";
import vHololike from "./lists/vtuberInfo.hololike";
import vMore from "./lists/vtuberInfo.more";
import vAll from "./lists/vtuberInfo.full";

export default [
    {
        title: "告诉我吧！今天的幸运 Hololiver",
        list: Object.assign({}, vHololive),
    },
    {
        title: "今天也要和 Holo 贴贴！",
        list: Object.assign({}, vHololive, vHololike),
    },
    {
        title: "是有趣的 VTuber 浮莲子呢！",
        list: vMore,
    }
]