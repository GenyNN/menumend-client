import { all, call, put, takeLatest } from 'redux-saga/effects'
import { toggleFavourite } from 'api'
import { ALL_FAVOURITES_REQUESTED, ALL_FAVOURITES_SUCCEEDED, ALL_FAVOURITES_FAILED } from './getall'

export const POST_FAVOURITE_REQUESTED = 'POST_FAVOURITE_REQUESTED'
export const POST_FAVOURITE_SUCCEEDED = 'POST_FAVOURITE_SUCCEEDED'
export const POST_FAVOURITE_FAILED = 'POST_FAVOURITE_FAILED'

export function requestPostFavourite(method, token, section, itemType, itemId) {
    console.log('requestPostFavourite saga ' + section + itemType + itemId + token)
    return { type: POST_FAVOURITE_REQUESTED, payload: { method, token, section, itemType, itemId } }
}

export function* watchRequestFavourite() {
  console.log('watchRequestFavourite saga')
  yield takeLatest(POST_FAVOURITE_REQUESTED, handleFavourite)
}

export function* handleFavourite(action) {
  try {
    const { method, token, section, itemType, itemId } = action.payload
    console.log('handleFavourite saga ' + itemId)
    const favouritePosted = yield call(toggleFavourite, method, token, section, itemType, itemId)
    yield put({
      type: POST_FAVOURITE_SUCCEEDED,
      payload: {
        favouritePosted,
      },
    })
  } catch (e) {
    yield put({ type: POST_FAVOURITE_FAILED, message: e.message })
  }
}

const initialState = {
  data: [],
  all: [],
}

export function reducer(state = initialState, action) {
  switch (action.type) {

  case POST_FAVOURITE_REQUESTED: {
    return { ...state }
  }

  case POST_FAVOURITE_SUCCEEDED: {
    return {
      ...state, data: action.payload
    }
  }

  case POST_FAVOURITE_FAILED: {
    return {
      ...state
    }
  }

  case ALL_FAVOURITES_REQUESTED: {
    return { ...state }
  }

  case ALL_FAVOURITES_SUCCEEDED: {
    return {
      ...state, all: action.payload
    }
  }

  case ALL_FAVOURITES_FAILED: {
    return {
      ...state
    }
  }

  default:
    return state
  }
}

export default reducer
