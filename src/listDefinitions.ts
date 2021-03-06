import vHololive from './lists/vtuberInfo.hololive'
import vHololike from './lists/vtuberInfo.hololike'
import vMore from './lists/vtuberInfo.more'
import vAll from './lists/vtuberInfo.full'
import { info as vMoreInfo } from './lists/vtuberInfo.more'
import { getHumanReadableDate } from './utils'
import { Dicer } from './types'
import emojiList from './lists/emoji'

import VTuberInsert from './middlewares/vtuberinsert.input.arg'
// import GoldenFinger from "./middlewares/goldenfinger/gf.change"
import BirthdayChange from './middlewares/birthday.change'
import DebugChange from './middlewares/debug.change'
import RandomSelection from './middlewares/random.select'
import ConsoleFinal from './middlewares/console.final'
import AnalyticsFinal from './middlewares/analytics.final'
import { Pipeline } from './main'
import { ItemPick } from './types_list'

import base64url from 'base64url'
import { getInfoLine } from './infoParser'

const exp: Dicer[] = [
  {
    title: '告诉我吧！今天的幸运 Hololiver',
    command: 'my',
    getText: (result) =>
      `${getHumanReadableDate(result.options.date)}，你的幸运 Hololiver 是${
        emojiList[result.name] || ''
      }${result.name}！`,
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
    command: 'tie',
    getText: (result) =>
      `${getHumanReadableDate(result.options.date)}，你和${
        emojiList[result.name] || ''
      }${result.name}贴贴！`,
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
    command: 'discover',
    getText: (result) => {
      const name = result.name
      const rand = result.rand
      let annon = `${getHumanReadableDate(
        result.options.date
      )}，VTuber 发现频道推荐的 VTuber 是${emojiList[name] || ''}${name}！`
      const payload: ItemPick =
        vAll[name]?.[Math.floor(rand * vAll[name].length)] || ''
      if (typeof payload === 'object' && payload.type === 'urlimage') {
        annon = `<a href="${encodeURI(payload.payload)}">\u200b</a>` + annon
      }
      const keywords = getInfoLine(vMoreInfo[name])
      if (keywords.length === 0) return annon
      return (
        annon +
        '\n关于 TA：' +
        keywords.slice(0, 4).join(' / ') +
        `\n[链接有误/已经毕业？<a href="https://t.me/holodailybot?start=${base64url(
          `R|${name}`
        )}">点此报告</a>]`
      )
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
