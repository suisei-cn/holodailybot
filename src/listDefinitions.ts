import vHololive from './lists/vtuberInfo.hololive'
import vHololike from './lists/vtuberInfo.hololike'
import vMore from './lists/vtuberInfo.more'
import vAll from './lists/vtuberInfo.full'
import { info as vMoreInfo } from './lists/vtuberInfo.more'
import { getHumanReadableDate } from './utils'
import { Dicer } from './types'

import VTuberInsert from './middlewares/vtuberinsert.input.arg'
// import GoldenFinger from "./middlewares/goldenfinger/gf.change"
import BirthdayChange from './middlewares/birthday.change'
import DebugChange from './middlewares/debug.change'
import RandomSelection from './middlewares/random.select'
import ConsoleFinal from './middlewares/console.final'
import AnalyticsFinal from './middlewares/analytics.final'
import { Pipeline } from './main'
import { ItemPick } from './types_list'

const exp: Dicer[] = [
  {
    title: '告诉我吧！今天的幸运 Hololiver',
    getText: (result) =>
      `今天是${getHumanReadableDate(result.options.date)}，${
        result.options.username
      } 的幸运 Hololiver 是${result.name}！`,
    procedures: new Pipeline([
      VTuberInsert(vHololive),
      BirthdayChange,
      // GoldenFinger,
      DebugChange,
      RandomSelection,
      ConsoleFinal,
      AnalyticsFinal,
    ]),
  },
  {
    title: '今天也要和 Holo 贴贴！',
    getText: (result) =>
      `今天是${getHumanReadableDate(result.options.date)}，${
        result.options.username
      } 和${result.name}贴贴！`,
    procedures: new Pipeline([
      VTuberInsert(Object.assign({}, vHololive, vHololike)),
      // GoldenFinger,
      DebugChange,
      RandomSelection,
      ConsoleFinal,
      AnalyticsFinal,
    ]),
  },
  {
    title: '是有趣的 VTuber 浮莲子呢！',
    getText: (result) => {
      const name = result.name
      const rand = result.rand
      let annon = `今天是${getHumanReadableDate(
        result.options.date
      )}，VTuber 发现频道给 ${
        result.options.username
      } 推荐的 VTuber 是${name}！`
      const payload: ItemPick =
        vAll[name]?.[Math.floor(rand * vAll[name].length)] || ''
      if (typeof payload === 'object' && payload.type === 'urlimage') {
        annon = `<a href="${encodeURI(payload.payload)}">\u200b</a>` + annon
      }
      const keywords: string[] = []
      for (const key of [
        'Twitter',
        'YouTube',
        'Bilibili',
        'Telegram',
        'Wiki',
        'GitHub',
      ]) {
        const keyName = key.toLowerCase()
        if (vMoreInfo[name] && vMoreInfo[name][keyName]) {
          const unofficial = vMoreInfo[name][keyName + '_official'] === false
          keywords.push(
            `<a href="${encodeURI(vMoreInfo[name][keyName])}">${key}</a>${
              unofficial ? ' (非官方)' : ''
            }`
          )
        }
      }
      if (keywords.length === 0) return annon
      return annon + '\n关于 TA：' + keywords.join(' / ')
    },
    procedures: new Pipeline([
      VTuberInsert(vMore),
      // GoldenFinger,
      DebugChange,
      RandomSelection,
      ConsoleFinal,
      AnalyticsFinal,
    ]),
  },
]

export default exp
