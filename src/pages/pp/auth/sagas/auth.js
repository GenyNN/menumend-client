import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { faceBookAuth as faceBookAuthApi } from 'api'
import { faceBookMe as faceBookMeApi } from 'api'

const FB_AUTH_REQUESTED = 'FB_AUTH_REQUESTED'
const AUTH_SUCCEEDED = 'AUTH_SUCCEEDED'
const AUTH_FAILED = 'AUTH_FAILED'

export function requestFbAuth(accessToken) {
  return {
    type: FB_AUTH_REQUESTED,
    payload: {
      accessToken,
    },
  }
}

export function* watchFbAuth() {
  yield takeLatest(FB_AUTH_REQUESTED, handleFbAuth)
}

export function* handleFbAuth(action) {
  try {
    const {
      accessToken,
    } = action.payload
    const response = yield call(faceBookAuthApi, accessToken)

    if (response.token) {
      const responseMe = yield call(faceBookMeApi, response.token)
      const auth = { ...responseMe }
      auth.token = response.token
      localStorage.setItem('auth', JSON.stringify(auth))

      yield put({
        type: AUTH_SUCCEEDED,
        payload: {
          token: response.token, firstName: responseMe.firstName, lastName: responseMe.lastName, pictureUrl: responseMe.pictureUrl,
        },
      })
    }

  } catch (e) {
    yield put({ type: AUTH_FAILED, message: e.message })
  }
}

export function reducer(state, action) {
  switch (action.type) {

  case AUTH_SUCCEEDED: {
    const {
      token, firstName, lastName, pictureUrl,
    } = action.payload
    return {
      ...state, token, firstName, lastName, pictureUrl,
    }
  }

  default:
    return state
  }
}

export default reducer

