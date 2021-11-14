import { loadCache, saveCache } from './cache'

const LOCATION_PRELOAD_SUCCESS = 'LOCATION_PRELOAD_SUCCESS'
const LOCATION_PRELOAD_FAIL = 'LOCATION_PRELOAD_FAIL'
const LOCATION_PRELOAD_ERR = 'LOCATION_PRELOAD_ERR'

const LOCATION_REQUESTED = 'LOCATION_REQUESTED'
const LOCATION_SUCCEEDED = 'LOCATION_SUCCEEDED'
const LOCATION_FAILED = 'LOCATION_FAILED'

const LOCATION_CACHE_READ = 'LOCATION_CACHE_READ'


const options = {
  enableHighAccuracy: true,
  timeout: 20 * 1000,
  maximumAge: 30 * 1000,
}
const STORAGE = window.localStorage
const LOCATION_KEY = 'location'
const LOCATION_ERR_KEY = 'locationError'


export function loadSavedPosition() {
  return (dispatch) => {

    const cachedPosition = loadCache()
    if (cachedPosition) {
      dispatch({
        type: LOCATION_CACHE_READ,
        payload: { position: cachedPosition },
      })
      return
    }

    const rawLocation = STORAGE.getItem(LOCATION_KEY)
    STORAGE.removeItem(LOCATION_KEY)

    const rawLocationError = STORAGE.getItem(LOCATION_ERR_KEY)
    STORAGE.removeItem(LOCATION_ERR_KEY)

    if (rawLocationError) {
      let error
      let success = false
      try {
        error = JSON.parse(rawLocationError)
        success = true
      } catch (parseError) {
        dispatch({ type: LOCATION_PRELOAD_FAIL, payload: { error: parseError } })
      }
      if (!success) {
        return
      }
      dispatch({ type: LOCATION_PRELOAD_ERR, payload: { error } })

    } else if (rawLocation) {
      STORAGE.removeItem(LOCATION_KEY)

      let location
      let success = false
      try {
        location = JSON.parse(rawLocation)
        success = true
      } catch (error) {
        dispatch({ type: LOCATION_PRELOAD_FAIL, payload: { error } })
      }
      if (!success) {
        return
      }
      dispatch({ type: LOCATION_PRELOAD_SUCCESS, payload: { location } })
    }
  }
}


export function getCurrentPosition() {
  return (dispatch) => {
    const handleSuccess = (positionResponse) => {
      const { latitude, longitude, accuracy } = positionResponse.coords
      const position = { latitude, longitude, accuracy }
      dispatch({ type: LOCATION_SUCCEEDED, payload: { position } })
      saveCache(position)
    }
    const handleError = (error) => {
      dispatch({ type: LOCATION_FAILED, payload: { error } })
    }
    dispatch({ type: LOCATION_REQUESTED })
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)
  }
}


export function reducer(state, action) {
  const error = 'Unable to retrieve your accurate location'

  switch (action.type) {

  case LOCATION_PRELOAD_SUCCESS: {
    const { latitude, longitude, accuracy } = action.payload.location
    const position = { latitude, longitude, accuracy }
    console.log('Loaded location', position)
    return { ...state, position, pending: false }
  }

  case LOCATION_PRELOAD_FAIL: {
    console.log('Failed to preload location')
    return { ...state, location: {}, error, pending: false }
  }

  case LOCATION_CACHE_READ:
  case LOCATION_SUCCEEDED: {
    const { position } = action.payload
    console.log('Got location', position)
    return { ...state, position, error: '', pending: false }
  }

  case LOCATION_REQUESTED: {
    console.log('Requested location!')
    return { ...state, position: {}, error: '', pending: true }
  }

  case LOCATION_FAILED: {
    console.log('Failed to get location')
    return { ...state, pending: false }
    // return { ...state, position: {}, error, pending: false }
  }

  default:
    return state
  }
}

export default reducer
