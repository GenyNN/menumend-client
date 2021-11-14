import { requestFetchChoices } from '../sagas/fetch'

export function requestHealthyChoices(city) {
  console.log('city is ' + city)
  return (dispatch) => dispatch(requestFetchChoices(city))
}
