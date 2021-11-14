import { watchFetchChoices, handleChoices } from './fetch'


const sagas = [
  watchFetchChoices,
  handleChoices,
]

export default sagas
