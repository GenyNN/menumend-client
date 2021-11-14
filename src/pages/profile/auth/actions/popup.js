export const SELECT_SIGN_UP = 'SELECT_SIGN_UP'
export const SELECT_SIGN_IN = 'SELECT_SIGN_IN'
export const UN_SELECT = 'UN_SELECT'

export const SELECT_PROFILE_SHOW = 'SELECT_PROFILE_SHOW'
export const SELECT_PROFILE_HIDE = 'SELECT_PROFILE_HIDE'

export function selectSignUp() {
  return {
    type: SELECT_SIGN_UP,
  }
}

export function selectSignIn() {
  return {
    type: SELECT_SIGN_IN,
  }
}

export function unSelect() {
  return {
    type: UN_SELECT,
  }
}

export function selectProfileShow() {
  return {
    type: SELECT_PROFILE_SHOW,
  }
}

export function selectProfileHide() {
  return {
    type: SELECT_PROFILE_HIDE,
  }
}

export function reducer(state, action) {
  switch (action.type) {
  case SELECT_SIGN_UP: {
    return { ...state, actionName: 'SIGN_UP' }
  }

  case SELECT_SIGN_IN: {
    return { ...state, actionName: 'SIGN_IN' }
  }

  case UN_SELECT: {
    return { ...state, actionName: '' }
  }

  case SELECT_PROFILE_SHOW: {
    return { ...state, profileShow: true }
  }

  case SELECT_PROFILE_HIDE: {
    return { ...state, profileShow: false }
  }
  default:
    return state
  }
}

export default reducer
