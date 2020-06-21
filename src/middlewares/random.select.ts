import { SelectMiddleware } from '../types'
const random = require('seedrandom')

export function getRandomSeedBasedOnDate (date: Date) {
  return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()
}

function getRngFromSeed (seed: string): number {
  return random(seed)()
}

const me: SelectMiddleware = {
  type: 'select',
  payload (selection, data) {
    const dateSeed = getRandomSeedBasedOnDate(data.now)
    const rand = getRngFromSeed(String(dateSeed) + String(data.user.id) + (data.query || ''))
    const powerTotal = Object.values(selection).reduce((a, b) => a + b)
    let targetPower = rand * powerTotal
    for (const [key, power] of Object.entries(selection)) {
      targetPower -= power
      if (targetPower <= 0) {
        return {
          ended: true,
          name: key,
          rand: rand
        }
      }
    }

    return {
      ended: true,
      name: Object.keys(selection)[0],
      rand
    }
  }
}

export default me
