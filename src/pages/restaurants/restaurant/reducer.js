import resetReducer from './actions/reset'
import setCategoryReducer from './actions/setCategory'
import fetchReducer from './sagas/fetch'
import selectReducer from './sagas/select'

const reducers = [
  resetReducer,
  fetchReducer,
  selectReducer,
  setCategoryReducer,
]

const initialState = {
  selected: {},
  menus: [],
  menuCategoryIndex: 0,
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
