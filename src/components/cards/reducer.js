import buttonsReducer from './actions/buttons'
import switcherTabReducer from './actions/switcherTab'
import sortingReducer from './actions/sorting'
import filterReducer from './sagas/filter'
import likingReducer from './sagas/liking'

const reducers = [
  buttonsReducer,
  filterReducer,
  switcherTabReducer,
  likingReducer,
  sortingReducer,
]

const initialState = {
  allTypesSelected: true,
  restaurantsSelected: false,
  dishesSelected: false,
  token: '',
  filteredData: null,
  sectionSelected: 'HC',
  sorting: 'createdAt',
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
