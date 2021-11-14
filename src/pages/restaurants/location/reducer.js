import locationReducer from './actions/location'
import availabilityReducer from './sagas/availability'


const reducers = [
  locationReducer,
  availabilityReducer,
]

const initialState = {
  position: {}, // internal position object recieved from navigator
  error: '', // error text when failed to obtain location
  pending: false, // waiting for location response from browser
  supported: true, // if user's region is supported
  initialized: false, // if request for region availability has finished
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
