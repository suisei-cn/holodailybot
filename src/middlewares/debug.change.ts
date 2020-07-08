import { ChangeMiddleware } from '../types'
import vtuberInfoFull from '../lists/vtuberInfo.full'

const me: ChangeMiddleware = {
  type: 'change',
  payload(selection, data) {
    const querySelector = data.query.split(' ')
    if (querySelector?.[0] === '!debug') {
      if (
        querySelector[1] &&
        Object.keys(vtuberInfoFull).includes(querySelector[1])
      ) {
        const targetNumber = Number(querySelector[2])
        // @ts-ignore
        const targetLength = vtuberInfoFull[querySelector[1]].length
        if (isNaN(targetNumber) || targetNumber >= targetLength) {
          return {
            ended: true,
            name: querySelector[1],
            rand: targetNumber / targetLength,
            inherit: {
              prefix: 'DEBUG MODE ON (PICK OUT OF BOUND)',
            },
          }
        }
        return {
          ended: true,
          name: querySelector[1],
          rand: targetNumber / targetLength,
          inherit: {
            prefix: 'DEBUG MODE ON',
          },
        }
      }
    }

    return {
      ended: false,
      selections: selection,
    }
  },
}

export default me
