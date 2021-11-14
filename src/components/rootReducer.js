import { combineReducers } from 'redux'
import cardsReducer from './cards/reducer'

const reducers = combineReducers({
  cards: cardsReducer,
})

export default reducers
