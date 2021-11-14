import { combineReducers } from 'redux'

import searchReducer from './search/reducer'
import locationReducer from './location/reducer'
import restaurantReducer from './restaurant/reducer'
import dishesReducer from './restaurant/Menu/actions/dishes'
import authReducer from './auth/reducer'
import shareReducer from './restaurant/sharing/reducer'
import homepageReducer from './homepage/sagas/fetch'
import favouriteReducer from './favourite/sagas/fetch'


const reducers = combineReducers({
  restaurant: restaurantReducer,
  location: locationReducer,
  search: searchReducer,
  dishes: dishesReducer,
  auth: authReducer,
  shareModal: shareReducer,
  healthyChoices: homepageReducer,
  favourites: favouriteReducer,
})

export default reducers
