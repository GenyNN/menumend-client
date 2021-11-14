import { requestAvailability } from '../sagas/availability'
import { loadSavedPosition } from './location'


export function initLocation() {
  return (dispatch) => {
    dispatch(requestAvailability())
    dispatch(loadSavedPosition())
  }
}

export function reducer(state, action) {
  switch (action.type) {

  default:
    return state
  }
}

export default reducer
