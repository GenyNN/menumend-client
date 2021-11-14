import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getAllFavourites } from 'api'

export const ALL_FAVOURITES_REQUESTED = 'ALL_FAVOURITES_REQUESTED'
export const ALL_FAVOURITES_SUCCEEDED = 'ALL_FAVOURITES_SUCCEEDED'
export const ALL_FAVOURITES_FAILED = 'ALL_FAVOURITES_FAILED'

export function requestAllFavourites(token, section) {
  return { type: ALL_FAVOURITES_REQUESTED, payload: { token, section } }
}

export function* watchAllFavourites() {
  yield takeLatest(ALL_FAVOURITES_REQUESTED, handleAllFavourites)
}

export function* handleAllFavourites(action) {
  try {
    const { token, section } = action.payload
    const allFavourites = yield call(getAllFavourites, token, section)
    yield put({
      type: ALL_FAVOURITES_SUCCEEDED,
      payload: {
        allFavourites,
      },
    })
  } catch (e) {
    yield put({ type: ALL_FAVOURITES_FAILED, message: e.message })
  }
}
