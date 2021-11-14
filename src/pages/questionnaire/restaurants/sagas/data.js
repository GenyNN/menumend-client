import { call, put, takeEvery, takeLatest, throttle, select } from 'redux-saga/effects'
import { getTopCityRestaurants, getTopCityDishes, getRestaurantInfo, getRestaurantMenus, getCitySuggestions } from 'api'

export const SET_CURRENT_CITY = 'SET_CURRENT_CITY'

export const REQUEST_CITY_SUGGESTIONS = 'REQUEST_CITY_SUGGESTIONS'
export const RESET_CITY_SUGGESTIONS = 'RESET_CITY_SUGGESTIONS'
export const REQUEST_CITY_SUGGESTIONS_SUCCEEDED = 'REQUEST_CITY_SUGGESTIONS_SUCCEEDED'
export const REQUEST_CITY_SUGGESTIONS_FAILED = 'REQUEST_CITY_SUGGESTIONS_FAILED'

export const REQUEST_TOP_CITY_RESTAURANTS = 'REQUEST_TOP_CITY_RESTAURANTS'
export const REQUEST_TOP_CITY_RESTAURANTS_SUCCEEDED = 'REQUEST_TOP_CITY_RESTAURANTS_SUCCEEDED'
export const REQUEST_TOP_CITY_RESTAURANTS_FAILED = 'REQUEST_TOP_CITY_RESTAURANTS_FAILED'

export const REQUEST_TOP_CITY_DISHES = 'REQUEST_TOP_CITY_DISHES'
export const REQUEST_TOP_CITY_DISHES_SUCCEEDED = 'REQUEST_TOP_CITY_DISHES_SUCCEEDED'
export const REQUEST_TOP_CITY_DISHES_FAILED = 'REQUEST_TOP_CITY_DISHES_FAILED'

export const RESTAURANT_SELECT = 'RESTAURANT_SELECT'
export const RESTAURANT_RESET = 'RESTAURANT_RESET'

export const RESTAURANT_REQUESTED = 'RESTAURANT_REQUESTED'
export const RESTAURANT_SUCCEEDED = 'RESTAURANT_SUCCEEDED'
export const RESTAURANT_FAILED = 'RESTAURANT_FAILED'

export const SET_CATEGORY = 'SET_CATEGORY'


export function setCategory(id) {
  return { type: SET_CATEGORY, payload: { id } }
}

export function setCurrentCity(city) {
  return {
    type: SET_CURRENT_CITY,
    city
  }
}

export function requestTopCityRestaurants(city) {
  return {
    type: REQUEST_TOP_CITY_RESTAURANTS,
    city
  }
}

export function requestTopCityDishes(city) {
  return {
    type: REQUEST_TOP_CITY_DISHES,
    city
  }
}

export function* watchData() {
  yield takeLatest(SET_CURRENT_CITY, handleCurrentCitySelection)
  yield takeLatest(REQUEST_TOP_CITY_RESTAURANTS, handleTopCityRestaurantsRequest)
  yield takeLatest(REQUEST_TOP_CITY_DISHES, handleTopCityDishesRequest)
}

export function* handleCurrentCitySelection(action) {
  yield put(requestTopCityRestaurants(Object.assign({}, action.city)))
  yield put(requestTopCityDishes(Object.assign({}, action.city)))
}

export function* handleTopCityRestaurantsRequest(action) {
  try {
    const state = yield select()
    const restaurants = yield call(getTopCityRestaurants, action.city, state.answers)

    yield put({ type: REQUEST_TOP_CITY_RESTAURANTS_SUCCEEDED, payload: { restaurants } })
  } catch (e) {
    yield put({ type: REQUEST_TOP_CITY_RESTAURANTS_FAILED, message: e.message })
  }
}

export function* handleTopCityDishesRequest(action) {
  try {
    const state = yield select()
    const dishes = yield call(getTopCityDishes, action.city, state.answers)

    yield put({ type: REQUEST_TOP_CITY_DISHES_SUCCEEDED, payload: { dishes } })
  } catch (e) {
    yield put({ type: REQUEST_TOP_CITY_DISHES_FAILED, message: e.message })
  }
}

export function requestRestaurant(id) {
  return {
    type: RESTAURANT_REQUESTED,
    payload: {
      id
    }
  }
}

export function selectRestaurant(restaurantData) {
  return {
    type: RESTAURANT_SELECT,
    payload: {
      data: restaurantData
    }
  }
}

export function resetRestaurant() {
  return { type: RESTAURANT_RESET }
}

export function* watchRestaurant() {
  yield takeLatest(RESTAURANT_REQUESTED, handleRestaurantRequest)
}

export function* handleRestaurantRequest(action) {
  try {
    const { id } = action.payload

    const restaurantRsp = yield call(getRestaurantInfo, id)
    const menusRsp = yield call(getRestaurantMenus, id)
    yield put({ type: RESTAURANT_SUCCEEDED, payload: { restaurantRsp, menusRsp } })
  } catch (e) {
    yield put({ type: RESTAURANT_FAILED, message: e.message })
  }
}

export function requestCitySuggestions(name) {
  if (name.length < 3) {
    return {
      type: RESET_CITY_SUGGESTIONS
    }
  }

  return {
    type: REQUEST_CITY_SUGGESTIONS,
    name
  }
}

export function* watchSuggestions() {
  yield throttle(1000, REQUEST_CITY_SUGGESTIONS, handleCitySuggestionsRequest)
}

export function* handleCitySuggestionsRequest(action) {
  try {
    const { name } = action

    const suggestions = yield call(getCitySuggestions, name)
    yield put({ type: REQUEST_CITY_SUGGESTIONS_SUCCEEDED, payload: { suggestions } })
  } catch (e) {
    yield put({ type: REQUEST_CITY_SUGGESTIONS_FAILED, message: e.message })
  }
}
