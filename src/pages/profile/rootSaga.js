import { all, fork } from 'redux-saga/effects'
import authSagas from './auth/sagas'
import cardSagas from '../../components/cards/sagas'

export default function* root() {
  const sagas = [
    ...authSagas,
    ...cardSagas,
  ]
  yield all(sagas.map(fork))
}
