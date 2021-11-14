import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getCuisines, getDiets, getAllergens, getDislikedIngredients, getDishes, nextQuestionnaireStep } from 'api'
import { select } from 'redux-saga/effects'
import { STEP_FORWARD } from '../../actions/questionnaire'
import {QUESTION_MULTIPLE_LIKE, QUESTION_SINGLE_LIKE} from '../QuestionsContainer'
import {SET_TASTE_PROFILE, UPDATE_PREVIOUS_ANSWER, UPDATE_PREVIOUS_SINGLE_ANSWER} from '../../actions/answers'

// if running with webpack devserver, use CORS proxy
const proxy = __DEVSERVER__ ? '' : ''
// if build target is testing, query specific domain
const base = __TESTING__
  ? 'https://mobile-api.menumend.com'
  : 'https://mobile-api.menumend.com'

const domain = `${proxy}${base}`

export const REQUEST_DISHES = 'REQUEST_DISHES'
export const REQUEST_DISHES_SUCCEEDED = 'REQUEST_DISHES_SUCCEEDED'
export const REQUEST_DISHES_FAILED = 'REQUEST_DISHES_FAILED'

export const REQUEST_CUISINES = 'REQUEST_CUISINES'
export const REQUEST_CUISINES_SUCCEEDED = 'REQUEST_CUISINES_SUCCEEDED'
export const REQUEST_CUISINES_FAILED = 'REQUEST_CUISINES_FAILED'

export const REQUEST_DIETS = 'REQUEST_DIETS'
export const REQUEST_DIETS_SUCCEEDED = 'REQUEST_DIETS_SUCCEEDED'
export const REQUEST_DIETS_FAILED = 'REQUEST_DIETS_FAILED'

export const REQUEST_ALLERGENS = 'REQUEST_ALLERGENS'
export const REQUEST_ALLERGENS_SUCCEEDED = 'REQUEST_ALLERGENS_SUCCEEDED'
export const REQUEST_ALLERGENS_FAILED = 'REQUEST_ALLERGENS_FAILED'

export const REQUEST_DISLIKED_INGREDIENTS = 'REQUEST_DISLIKED_INGREDIENTS'
export const REQUEST_DISLIKED_INGREDIENTS_SUCCEEDED = 'REQUEST_DISLIKED_INGREDIENTS_SUCCEEDED'
export const REQUEST_DISLIKED_INGREDIENTS_FAILED = 'REQUEST_DISLIKED_INGREDIENTS_FAILED'

export const REQUEST_SELECTION_DISHES = 'REQUEST_SELECTION_DISHES'
export const REQUEST_SELECTION_DISHES_SUCCEEDED = 'REQUEST_SELECTION_DISHES_SUCCEEDED'
export const REQUEST_SELECTION_DISHES_FAILED = 'REQUEST_SELECTION_DISHES_FAILED'

export function requestDishes() {
  return {
    type: REQUEST_DISHES
  }
}

export function requestCuisines() {
  return {
    type: REQUEST_CUISINES
  }
}

export function requestDiets() {
  return {
    type: REQUEST_DIETS
  }
}

export function requestAllergens() {
  return {
    type: REQUEST_ALLERGENS
  }
}

export function requestDislikedIngredients() {
  return {
    type: REQUEST_DISLIKED_INGREDIENTS
  }
}

export function requestSelectionDishes(profile) {
  return {
    type: REQUEST_SELECTION_DISHES,
    profile
  }
}


export function* watchData() {
  yield takeLatest(REQUEST_DISHES, handleDishesRequest)
  yield takeLatest(REQUEST_CUISINES, handleCuisinesRequest)
  yield takeLatest(REQUEST_DIETS, handleDietsRequest)
  yield takeLatest(REQUEST_ALLERGENS, handleAllergensRequest)
  yield takeLatest(REQUEST_DISLIKED_INGREDIENTS, handleDislikedIngredientsRequest)
  yield takeLatest(REQUEST_SELECTION_DISHES, handleSelectionDishesRequest)
  yield takeLatest(STEP_FORWARD, handleStepForward)
}

export function* handleDishesRequest() {
  try {
    const dishesList = yield call(getDishes)
    const dishes = dishesList.map(dish => {
      dish.image_url = domain + dish.image_url
      return dish
    })

    yield put({ type: REQUEST_DISHES_SUCCEEDED, payload: { dishes } })
  } catch (e) {
    yield put({ type: REQUEST_DISHES_FAILED, message: e.message })
  }
}

export function* handleCuisinesRequest() {
  try {
    const cuisines = yield call(getCuisines)
    yield put({ type: REQUEST_CUISINES_SUCCEEDED, payload: { cuisines } })
  } catch (e) {
    yield put({ type: REQUEST_CUISINES_FAILED, message: e.message })
  }
}

export function* handleDietsRequest() {
  try {
    const diets = yield call(getDiets)
    yield put({ type: REQUEST_DIETS_SUCCEEDED, payload: { diets } })
  } catch (e) {
    yield put({ type: REQUEST_DIETS_FAILED, message: e.message })
  }
}

export function* handleAllergensRequest() {
  try {
    const allergens = yield call(getAllergens)
    yield put({ type: REQUEST_ALLERGENS_SUCCEEDED, payload: { allergens } })
  } catch (e) {
    yield put({ type: REQUEST_ALLERGENS_FAILED, message: e.message })
  }
}

export function* handleDislikedIngredientsRequest() {
  try {
    const dislikedIngredients = yield call(getDislikedIngredients)
    yield put({ type: REQUEST_DISLIKED_INGREDIENTS_SUCCEEDED, payload: { dislikedIngredients } })
  } catch (e) {
    yield put({ type: REQUEST_DISLIKED_INGREDIENTS_FAILED, message: e.message })
  }
}

export function* handleStepForward() {
  const state = yield select()
  if (state.questionnaire.activeQuestion !== QUESTION_MULTIPLE_LIKE || state.answers.tasteProfile) {
    return
  }

  yield put(requestSelectionDishes(state.answers))
}

export function* handleSelectionDishesRequest(action) {
  try {
    const { profile } = action

    const selectionDishes = yield call(nextQuestionnaireStep, profile)
    let dishes = []

    if (selectionDishes.next_pair) {
      // multiple like questions
      dishes = selectionDishes.next_pair

      yield put({
        type: UPDATE_PREVIOUS_ANSWER,
        answer: {
          id0: dishes[0],
          id1: dishes[1],
          resp: 'neither'
        }
      })

    } else if (selectionDishes.next_single) {
      // single like questions
      dishes = [selectionDishes.next_single]

      yield put({
        type: UPDATE_PREVIOUS_SINGLE_ANSWER, answer: {
          id0: dishes[0],
          resp: 'dislike'
        }
      })
    } else if (selectionDishes.taste_profile) {
      // taste profile
      yield put({
        type: SET_TASTE_PROFILE,
        tasteProfile: selectionDishes.taste_profile
      })

      // moving to next step
      yield put({
        type: STEP_FORWARD,
        force: true
      })
      return
    }

    yield put({ type: REQUEST_SELECTION_DISHES_SUCCEEDED, payload: { selectionDishes: dishes } })
  } catch (e) {
    yield put({ type: REQUEST_SELECTION_DISHES_FAILED, message: e.message })
  }
}
