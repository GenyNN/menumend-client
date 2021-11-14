import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { toggleFavourite } from 'api'

const UNLIKE_CARD_REQUESTED = 'UNLIKE_CARD_REQUESTED'
const UNLIKE_CARD_SUCCEEDED = 'UNLIKE_CARD_SUCCEEDED'
const UNLIKE_CARD_FAILED = 'UNLIKE_CARD_FAILED'


export function requesthCardUnliking(params) {
  return {
    type: UNLIKE_CARD_REQUESTED,
    payload: {
      params,
    },
  }
}

export function* watchCardUnliking() {
  yield takeLatest(UNLIKE_CARD_REQUESTED, handleCardFiltering)
}

export function* handleCardFiltering(action) {
  try {
    const { params } = action.payload
    const {
      authenticated,
      sectionSelected,
      type,
      itemId,
      filteredData,
    } = params

    const response = yield call(toggleFavourite, 'DELETE', authenticated, sectionSelected, type, parseInt(itemId))

    if (response.ok) {
      const filteredResult = filteredData.filter(item => item.item.id !== itemId)
      yield put({
        type: UNLIKE_CARD_SUCCEEDED,
        payload: {
          filteredResult,
        },
      })

    }

  } catch (e) {
    yield put({ type: UNLIKE_CARD_FAILED, message: e.message })
  }
}


export function reducer(state, action) {
  switch (action.type) {

  case UNLIKE_CARD_SUCCEEDED: {
    const { filteredResult } = action.payload
    return {
      ...state, filteredData: filteredResult,
    }
  }

  default:
    return state
  }
}

export default reducer
