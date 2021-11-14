import { watchEmailSignUp, watchEmailSignIn, watchFbAuth } from './auth'
import { watchLogout } from './logout'

const sagas = [
  watchFbAuth, watchLogout, watchEmailSignUp, watchEmailSignIn,
]

export default sagas
