import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { searchCity, searchRestaurant } from 'api'

const SEARCH_REQUESTED = 'SEARCH_REQUESTED'
const SEARCH_SUCCEEDED = 'SEARCH_SUCCEEDED'
const SEARCH_FAILED = 'SEARCH_FAILED'


export function requestSearch(name) {
  return (dispatch, getState) => {
    const state = getState()
    // probably its worth to cache values in component?
    const { latitude, longitude } = state.location.position
    dispatch({ type: SEARCH_REQUESTED, payload: { name, latitude, longitude } })
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUESTED, handleSearch)
}

export function* handleSearch(action) {
  try {
    let { name, latitude, longitude } = action.payload
    let restaurants = yield call(searchRestaurant, name, latitude, longitude)
    let justCloseRestaurants = false
    if (typeof name !== 'string') {
      restaurants = restaurants.slice(0, 2)
      justCloseRestaurants = true
    } else {
      justCloseRestaurants = false
    }
    const cities = yield call(searchCity, name)
    yield put({ type: SEARCH_SUCCEEDED, payload: { restaurants, cities, justCloseRestaurants } })
  } catch (e) {
    yield put({ type: SEARCH_FAILED, message: e.message })
  }
}

export function reducer(state, action) {
  switch (action.type) {
  case SEARCH_SUCCEEDED: {
    const { restaurants, cities, justCloseRestaurants } = action.payload
    return { ...state, restaurants, cities, justCloseRestaurants } }
  default:
    return state
  }
}

export default reducer
