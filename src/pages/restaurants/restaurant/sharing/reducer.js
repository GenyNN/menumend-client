const SHARE_SHOW = 'SHARE_SHOW'
const SHARE_HIDE = 'SHARE_HIDE'
const LINK_COPIED = 'LINK_COPIED'

let isShown = false
const initialState = {
  isShown: false,
  linkCopied: false,
  url: 'http://menumend.com'
}

export function toggleModal(url) {
  isShown = !isShown
  if (!isShown) {
    return { type: SHARE_HIDE, payload: { url: null } }
  }
  return { type: SHARE_SHOW, payload: { url } }
}

export function copyLink(url) {
  return { type: LINK_COPIED, payload: { url } }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SHARE_SHOW:
    return { ...state, isShown: true, url: action.payload.url }
  case SHARE_HIDE:
    return { linkCopied: false, isShown: false, url: 'http://menumend.com' }
  case LINK_COPIED:
    return { ...state, linkCopied: true, url: action.payload.url }
  default:
    return state
  }
}
