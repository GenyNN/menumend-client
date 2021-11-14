import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getRestaurantMenus, getRestaurantInfo } from 'api'

export const FETCH_RESTAURANT_REQUESTED = 'FETCH_RESTAURANT_REQUESTED'
export const FETCH_RESTAURANT_SUCCEEDED = 'FETCH_RESTAURANT_SUCCEEDED'
export const FETCH_RESTAURANT_FAILED = 'FETCH_RESTAURANT_FAILED'


export function requestFetchRestaurant(restaurantId) {
  return {
    type: FETCH_RESTAURANT_REQUESTED,
    payload: { id: restaurantId },
  }
}

export function* watchFetchRestaurant() {
  yield takeLatest(FETCH_RESTAURANT_REQUESTED, handleFetchRestaurant)
}

export function* handleFetchRestaurant(action) {
  try {
    const { id } = action.payload
    const [restaurantInfo, restaurantMenus] = yield all([
      call(getRestaurantInfo, id),
      call(getRestaurantMenus, id),
    ])
    yield put({
      type: FETCH_RESTAURANT_SUCCEEDED,
      payload: {
        id, restaurantMenus, restaurantInfo,
      },
    })
  } catch (e) {
    yield put({ type: FETCH_RESTAURANT_FAILED, message: e.message })
  }
}

export function reducer(state, action) {
  switch (action.type) {

  case FETCH_RESTAURANT_REQUESTED: {
    return { ...state, selected: {} }
  }

  case FETCH_RESTAURANT_SUCCEEDED: {
    const { restaurantInfo, restaurantMenus } = action.payload
    const { menus } = restaurantMenus
    return {
      ...state,
      menus,
      selected: restaurantInfo,
      menuCategoryIndex: 0,
    }
  }

  case FETCH_RESTAURANT_FAILED: {
    return {
      ...state,
      menus: [],
      selected: {},
      menuCategoryIndex: 0,
    }
  }

  default:
    return state
  }
}

export default reducer
