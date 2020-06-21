import vHololive from './lists/vtuberInfo.hololive';
import vHololike from './lists/vtuberInfo.hololike';
import vMore from './lists/vtuberInfo.more';
import { getHumanReadableDate } from './utils';
import { Dicer } from './types';

import VTuberInsert from './middlewares/vtuberinsert.input.arg';
// import GoldenFinger from "./middlewares/goldenfinger/gf.change"
import BirthdayChange from './middlewares/birthday.change'
import DebugChange from './middlewares/debug.change'
import RandomSelection from './middlewares/random.select'
import ConsoleFinal from './middlewares/console.final'
import { Pipeline } from './main';

const exp: Dicer[] = [
    {
        title: '告诉我吧！今天的幸运 Hololiver',
        getText: (result) => `今天是${getHumanReadableDate(result.options.date)}，${result.options.username} 的幸运 Hololiver 是${result.name}！`,
        procedures: new Pipeline([
            VTuberInsert(vHololive),
            BirthdayChange,
            // GoldenFinger,
            DebugChange,
            RandomSelection,
            ConsoleFinal
        ])
    },
    {
        title: '今天也要和 Holo 贴贴！',
        getText: (result) => `今天是${getHumanReadableDate(result.options.date)}，${result.options.username} 和${result.name}贴贴！`,
        procedures: new Pipeline([
            VTuberInsert(Object.assign({}, vHololive, vHololike)),
            // GoldenFinger,
            DebugChange,
            RandomSelection,
            ConsoleFinal
        ])
    },
    {
        title: '是有趣的 VTuber 浮莲子呢！',
        getText: (result) => `今天是${getHumanReadableDate(result.options.date)}，VTuber 发现频道给 ${result.options.username} 推荐的 VTuber 是${result.name}！`,
        procedures: new Pipeline([
            VTuberInsert(vMore),
            // GoldenFinger,
            DebugChange,
            RandomSelection,
            ConsoleFinal
        ])
    }
]

export default exp;