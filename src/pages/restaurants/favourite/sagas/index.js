import { watchRequestFavourite, handleFavourite } from './fetch'
import { watchAllFavourites, handleAllFavourites } from './getall'


const sagas = [
  watchRequestFavourite,
  handleFavourite,
  watchAllFavourites,
  handleAllFavourites,
]

export default sagas
