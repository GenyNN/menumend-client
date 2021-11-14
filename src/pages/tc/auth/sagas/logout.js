import { call, put, takeLatest } from 'redux-saga/effects'
import { logout as logoutApi } from 'api'

const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED'
const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED'
const LOGOUT_FAILED = 'LOGOUT_FAILED'

export function logout(token) {
  return {
    type: LOGOUT_REQUESTED,
    payload: {
      token,
    },
  }
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_REQUESTED, handleLogout)
}


export function* handleLogout(action) {
  try {
    const { token } = action.payload
    const response = yield call(logoutApi, token)

    if (response.ok) {
      const auth = {
        token: '', firstName: '', lastName: '', pictureUrl: '',
      }
      localStorage.setItem('auth', JSON.stringify(auth))
      yield put({
        type: LOGOUT_SUCCEEDED,
        payload: {
          ok: response.ok,
        },
      })
    }
  } catch (e) {
    yield put({ type: LOGOUT_FAILED, message: e.message })
  }
}

export function reducer(state, action) {
  switch (action.type) {
  case LOGOUT_SUCCEEDED: {
    const [token, firstName, lastName, pictureUrl, actionName, host, profileShow] = ['', '', '', '', '', '', false]
    return {
      ...state, token, firstName, lastName, pictureUrl, actionName, host, profileShow,
    }
  }

  default:
    return state
  }
}

export default reducer

