import { watchFbAuth } from './auth'
import { watchLogout } from './logout'

const sagas = [
  watchFbAuth, watchLogout,
]

export default sagas
