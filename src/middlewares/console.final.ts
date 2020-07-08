import { FinalMiddleware } from '../types'

const me: FinalMiddleware = {
  type: 'final',
  payload(result) {
    console.log(`${result.options.username} 的结果是： ${result.name}`)
  },
}

export default me
