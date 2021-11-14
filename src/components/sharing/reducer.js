const SHARE_SHOW = 'SHARE_SHOW'
const SHARE_HIDE = 'SHARE_HIDE'
const LINK_COPIED = 'LINK_COPIED'

let isShown = false
const initialState = {
  isShown: false,
  linkCopied: false,
}

export function toggleModal() {
  isShown = !isShown
  if (!isShown) {
    return { type: SHARE_HIDE }
  }
  return { type: SHARE_SHOW }
}

export function copyLink() {
  return { type: LINK_COPIED }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SHARE_SHOW:
    return { ...state, isShown: true }
  case SHARE_HIDE:
    return { linkCopied: false, isShown: false }
  case LINK_COPIED:
    return { ...state, linkCopied: true }
  default:
    return state
  }
}
