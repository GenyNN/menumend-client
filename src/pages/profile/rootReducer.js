import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import cardsReducer from '../../components/cards/reducer'
import shareReducer from '../../components/sharing/reducer'

const reducers = combineReducers({
  auth: authReducer,
  cards: cardsReducer,
  shareModal: shareReducer,
})

export default reducers
