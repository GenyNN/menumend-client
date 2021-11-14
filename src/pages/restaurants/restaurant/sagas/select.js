import { call, put, takeLatest } from 'redux-saga/effects'
import { getRestaurantMenus } from 'api'

export const SELECT_REQUESTED = 'SELECT_REQUESTED'
export const SELECT_SUCCEEDED = 'SELECT_SUCCEEDED'
export const SELECT_FAILED = 'SELECT_FAILED'


export function requestSelectRestaurant(restaurantData, distance) {
  const { location_id: id } = restaurantData
  return {
    type: SELECT_REQUESTED,
    payload: {
      restaurantData, id, distance
    },
  }
}

export function* watchSelectRestaurant() {
  yield takeLatest(SELECT_REQUESTED, handleSelect)
}

export function* handleSelect(action) {
  try {
    const { restaurantData, id } = action.payload
    const response = yield call(getRestaurantMenus, id)
    yield put({ type: SELECT_SUCCEEDED, payload: { restaurantData, id, response } })
  } catch (e) {
    yield put({ type: SELECT_FAILED, message: e.message })
  }
}

export function reducer(state, action) {
  switch (action.type) {

  case SELECT_REQUESTED: {
    const { restaurantData } = action.payload
    return { ...state, selected: restaurantData }
  }

  case SELECT_SUCCEEDED: {
    const { menus } = action.payload.response
    return { ...state, menus, menuCategoryIndex: 0 }
  }

  case SELECT_FAILED: {
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
