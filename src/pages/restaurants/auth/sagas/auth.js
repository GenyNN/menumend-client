import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { faceBookAuth as faceBookAuthApi } from 'api'
import { faceBookMe as faceBookMeApi } from 'api'
import { emailSignup as emailSignupApi } from 'api'
import { emailSignin as emailSigninApi } from 'api'

const FB_AUTH_REQUESTED = 'FB_AUTH_REQUESTED'
const AUTH_SUCCEEDED = 'AUTH_SUCCEEDED'
const AUTH_ERROR = 'AUTH_ERROR'
const AUTH_FAILED = 'AUTH_FAILED'
const EMAIL_SIGNUP_REQUESTED = 'EMAIL_SIGNUP_REQUESTED'
const EMAIL_SIGNIN_REQUESTED = 'EMAIL_SIGNIN_REQUESTED'

export function requestFbAuth(accessToken) {
  return {
    type: FB_AUTH_REQUESTED,
    payload: {
      accessToken,
    },
  }
}

export function requestEmailSingUp(email, password, handler) {
  return {
    type: EMAIL_SIGNUP_REQUESTED,
    payload: {
      email,
      password,
      handler,
    },
  }
}

export function requestEmailSingIn(email, password, handler) {
  return {
    type: EMAIL_SIGNIN_REQUESTED,
    payload: {
      email,
      password,
      handler,
    },
  }
}

export function* watchFbAuth() {
  yield takeLatest(FB_AUTH_REQUESTED, handleFbAuth)
}

export function* watchEmailSignUp() {
  yield takeLatest(EMAIL_SIGNUP_REQUESTED, handleEmailSignUp)
}

export function* watchEmailSignIn() {
  yield takeLatest(EMAIL_SIGNIN_REQUESTED, handleEmailSignIn)
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

export function* handleEmailSignUp(action) {
  try {
    const {
      email,
      password,
      handler,
    } = action.payload
    const response = yield call(emailSignupApi, email, password, 'Your', 'Name')

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
    if (response.details) {
      if (response.details.includes('duplicate')) {
        handler()
        yield put({
          type: AUTH_ERROR,
          payload: { emailError: true, errorMessage: 'The email is already used' },
        })
      }
    }
  } catch (e) {
    yield put({ type: AUTH_FAILED })
  }
}

export function* handleEmailSignIn(action) {
  try {
    const {
      email,
      password,
      handler,
    } = action.payload
    const response = yield call(emailSigninApi, email, password)

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
    if (response.details) {
      console.log(JSON.stringify(response.details))
      if (response.details.includes('Password is wrong') || response.details.includes('User not found')) {
          handler()
        yield put({
          type: AUTH_ERROR,
          payload: { emailError: true, errorMessage: ' Incorrect login or password' },
        })
      }
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
  case AUTH_ERROR: {
    const {
      emailError, errorMessage,
    } = action.payload
    return {
      ...state, emailError, errorMessage,
    }
  }


  default:
    return state
  }
}

export default reducer

