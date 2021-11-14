import {
  SELECT_REQUESTED, SELECT_SUCCEEDED, SELECT_FAILED,
} from '../restaurant/sagas/select'
import searchReducer from './sagas/search'
import resetReducer from './actions/reset'


const reducers = [
  searchReducer,
  resetReducer,
]

const initialState = {
  restaurants: [],
  cities: [],
  justCloseRestaurants: false
}


export default function reducer(state = initialState, action = {}) {
  let newState
  switch (action.type) {
  // global reducers here


  // reset search results when item is selected
  case SELECT_REQUESTED:
  case SELECT_SUCCEEDED:
  case SELECT_FAILED:
    return { ...state, results: [] }

  default:
    newState = state
    break
  }
  return reducers.reduce((s, r) => r(s, action), newState)
}
