export const SELECT_SIGN_UP = 'SELECT_SIGN_UP'
export const SELECT_SIGN_IN = 'SELECT_SIGN_IN'
export const UN_SELECT = 'UN_SELECT'

export const SELECT_PROFILE_SHOW = 'SELECT_PROFILE_SHOW'
export const SELECT_PROFILE_HIDE = 'SELECT_PROFILE_HIDE'
export const SELECT_TOGGLE_AGREE = 'SELECT_TOGGLE_AGREE'

export const ON_ERROR_EMAIL = 'ON_ERROR_EMAIL'
export const ON_ERROR_PASSWORD = 'ON_ERROR_PASSWORD'
export const ON_ERROR_AGREE = 'ON_ERROR_AGREE'
export const ON_ERRORS_CLEAR = 'ON_ERRORS_CLEAR'

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

export function selectToggleAgree() {
  return {
    type: SELECT_TOGGLE_AGREE,
  }
}
export function onErrorEmail(message) {
  return {
    type: ON_ERROR_EMAIL,
    message,
  }
}


export function onErrorPassword(message) {
  return {
    type: ON_ERROR_PASSWORD,
    message,
  }
}

export function onErrorAgree(message) {
  return {
    type: ON_ERROR_AGREE,
    message,
  }
}

export function onErrorsClear() {
  return {
    type: ON_ERRORS_CLEAR,
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

  case SELECT_TOGGLE_AGREE: {
    return { ...state, agree: !state.agree }
  }

  case ON_ERROR_EMAIL: {
    return {
      ...state, emailError: true, passwordError: false, agreeError: false, errorMessage: action.message,
    }
  }

  case ON_ERROR_PASSWORD: {
    return {
      ...state, passwordError: true, emailError: false, agreeError: false, errorMessage: action.message,
    }
  }

  case ON_ERROR_AGREE: {
    return {
      ...state, agreeError: true, emailError: false, passwordError: false, errorMessage: action.message,
    }
  }

  case ON_ERRORS_CLEAR: {
    return {
      ...state, emailError: false, passwordError: false, agreeError: false, //errorMessage: '',
    }
  }

  default:
    return state
  }
}

export default reducer
