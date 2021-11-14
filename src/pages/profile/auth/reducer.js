import popupReducer from './actions/popup'
import authReducer from './sagas/auth'
import logoutReducer from './sagas/logout'

const reducers = [
  popupReducer,
  authReducer,
  logoutReducer,
]

const initialState = {
  actionName: '',
  token: '',
  host: '',
  pictureUrl: '',
  firstName: '',
  lastName: '',
  profileShow: false,
}

const authInitial = JSON.parse(localStorage.getItem('auth'))
if (authInitial) {
  initialState.token = authInitial.token
  initialState.firstName = authInitial.firstName
  initialState.lastName = authInitial.lastName
  initialState.pictureUrl = authInitial.pictureUrl
}

export default function reducer(state = initialState, action = {}) {
  let newState
  switch (action.type) {
  // global reducers here

  default:
    newState = state
    break
  }
  return reducers.reduce((s, r) => r(s, action), newState)
}
