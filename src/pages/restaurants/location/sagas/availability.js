import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { checkAvailability } from 'api'

export const AVAILABILITY_REQUESTED = 'AVAILABILITY_REQUESTED'
export const AVAILABILITY_SUCCEEDED = 'AVAILABILITY_SUCCEEDED'
export const AVAILABILITY_FAILED = 'AVAILABILITY_FAILED'
export const LOCATION_SPOOF = 'LOCATION_SPOOF'


export function spoofLocation() {
  return { type: LOCATION_SPOOF }
}

export function requestAvailability() {
  return { type: AVAILABILITY_REQUESTED }
}

export function* watchAvailability() {
  yield takeLatest(AVAILABILITY_REQUESTED, handleAvailability)
}

export function* handleAvailability(action) {
  try {
    const response = yield call(checkAvailability)
    const { available } = response
    yield put({ type: AVAILABILITY_SUCCEEDED, payload: { available } })
    if (!available) {
      yield put(spoofLocation())
    }
  } catch (e) {
    yield put({ type: AVAILABILITY_FAILED, message: e.message })
  }
}

export function reducer(state, action) {
  switch (action.type) {

  case AVAILABILITY_SUCCEEDED: {
    const { available } = action.payload
    return { ...state, supported: available, initialized: true }
  }

  case AVAILABILITY_FAILED: {
    // initialize anyway, meaning request has finished
    return { ...state, initialized: true }
  }

  case LOCATION_SPOOF: {
    const position = {
      latitude: 40.7278415,
      longitude: -73.9912863,
      accuracy: 100,
    }
    return { ...state, position }
  }

  default:
    return state
  }
}

export default reducer
