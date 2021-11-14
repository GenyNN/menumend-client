import { all, fork } from 'redux-saga/effects'
// import authSagas from './auth/sagas'

export default function* root() {
  const sagas = [
    // ...authSagas,
  ]
  yield all(sagas.map(fork))
}
