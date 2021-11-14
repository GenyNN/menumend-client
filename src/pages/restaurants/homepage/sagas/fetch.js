import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getHealthyChoices, getTopDishes } from 'api'

export const FETCH_CHOICES_REQUESTED = 'FETCH_CHOICES_REQUESTED'
export const FETCH_CHOICES_SUCCEEDED = 'FETCH_CHOICES_SUCCEEDED'
export const FETCH_CHOICES_FAILED = 'FETCH_CHOICES_FAILED'


export function requestFetchChoices(city) {
    console.log('requestFetchChoices saga ' + city)
    return { type: FETCH_CHOICES_REQUESTED, payload: { city: city } }
}

export function* watchFetchChoices() {
  console.log('watchFetchChoices saga')
  yield takeLatest(FETCH_CHOICES_REQUESTED, handleChoices)
}

export function* handleChoices(action) {
  try {
    const { city } = action.payload
    console.log('handleChoices saga ' + city)
    const healthyChoices = yield [
      call(getHealthyChoices, city),
      call(getTopDishes, city)]
    console.log(healthyChoices)
    yield put({
      type: FETCH_CHOICES_SUCCEEDED,
      payload: {
        healthyChoices
      },
    })
  } catch (e) {
    yield put({ type: FETCH_CHOICES_FAILED, message: e.message })
  }
}

const initialState = {
}

export function reducer(state = initialState, action) {
  switch (action.type) {

  case FETCH_CHOICES_REQUESTED: {
    return { ...state }
  }

  case FETCH_CHOICES_SUCCEEDED: {
    return {
      data: action.payload
    }
  }

  case FETCH_CHOICES_FAILED: {
    return {
      ...state
    }
  }

  default:
    return state
  }
}

export default reducer
