import { all, fork } from 'redux-saga/effects'
import searchSagas from './search/sagas'
import locationSagas from './location/sagas'
import restaurantSagas from './restaurant/sagas'
import homepageSagas from './homepage/sagas'
import authSagas from './auth/sagas'
import favouriteSagas from './favourite/sagas'


export default function* root() {
  const sagas = [
    ...searchSagas,
    ...locationSagas,
    ...restaurantSagas,
    ...authSagas,
    ...homepageSagas,
    ...favouriteSagas,
  ]
  yield all(sagas.map(fork))
}
