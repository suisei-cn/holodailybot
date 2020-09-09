import { VTuberInfo } from '../types'

declare module '*.info.json' {
  const vtbs: VTuberInfo
  export default vtbs
}
