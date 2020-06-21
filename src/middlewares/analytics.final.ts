import { FinalMiddleware } from '../types'
import { getMMDD } from './utils'
import { tgSendMessage } from '../util.tg'
const ADMINCHAT_ID = process.env.TELEGRAM_ADMINCHAT_ID

interface AnalyticData {
  [key: string]: number;
}

const localData = {
  analytics: ({} as AnalyticData),
  lastTime: ''
}

const me: FinalMiddleware = {
  type: 'final',
  payload(result) {
    const name = result.name
    if (localData.analytics[name]) {
      localData.analytics[name] += 1
    } else {
      localData.analytics[name] = 1
    }
    const mmdd = getMMDD(result.options.date)
    if (localData.lastTime === mmdd) return
    const totalUsages = Object.values(localData.analytics).reduce((a, b) => a + b)
    localData.lastTime = mmdd
    let text = `${mmdd}: ${totalUsages} gachas in total.\n`
    const sortedResults = Object.entries(localData.analytics).sort((b, a) => a[1] - b[1])
    for (const [key, value] of sortedResults) {
      text += `${key}: ${value} (${((value / totalUsages) * 100).toFixed(2)}%)\n`
    }
    text += '-----------------------------------\n'
    text += ' A new day has started! Enjoy! '
    console.log(text)
    if (ADMINCHAT_ID) {
      tgSendMessage(Number(ADMINCHAT_ID), text);
    }
    localData.analytics = {}
  }
}

export default me
