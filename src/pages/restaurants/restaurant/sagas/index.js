import { watchFetchRestaurant } from './fetch'
import { watchSelectRestaurant } from './select'


const sagas = [
  watchFetchRestaurant,
  watchSelectRestaurant,
]

export default sagas
