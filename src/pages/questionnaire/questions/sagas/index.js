import { watchItems } from './items'
import { watchData } from './data'

const sagas = [
  watchItems,
  watchData
]

export default sagas
