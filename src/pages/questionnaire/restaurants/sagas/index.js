import { watchData, watchRestaurant, watchSuggestions } from './data'

const sagas = [
  watchData,
  watchRestaurant,
  watchSuggestions
]

export default sagas
