import { watchCardFiltering } from './filter'
import { watchCardUnliking } from './liking'

const sagas = [
  watchCardFiltering,
  watchCardUnliking,
]

export default sagas
