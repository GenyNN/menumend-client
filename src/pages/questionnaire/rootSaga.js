import { all, fork } from 'redux-saga/effects'
import questionsSagas from './questions/sagas'
import restaurantsSagas from './restaurants/sagas'


export default function* root() {
  const sagas = [
    ...questionsSagas,
    ...restaurantsSagas
  ]
  yield all(sagas.map(fork))
}
