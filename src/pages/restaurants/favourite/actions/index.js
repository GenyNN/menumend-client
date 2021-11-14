import { requestPostFavourite } from '../sagas/fetch'
import { requestAllFavourites } from '../sagas/getall'

export function toggleFavourite(method, token, section, itemType, itemId) {
  return (dispatch) => dispatch(requestPostFavourite(method, token, section, itemType, itemId))
}

export function getAllFavourites(token, section) {
  return (dispatch) => dispatch(requestAllFavourites(token, section))
}
