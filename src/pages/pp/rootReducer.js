import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import shareReducer from '../../components/sharing/reducer'

const reducers = combineReducers({
  auth: authReducer,
  shareModal: shareReducer,
})

export default reducers
