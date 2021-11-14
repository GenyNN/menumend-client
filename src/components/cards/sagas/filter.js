import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { filterCards as filterCardsApi } from 'api'

const CARD_FILTER_REQUESTED = 'CARD_FILTER_REQUESTED'
const CARD_FILTER_SUCCEEDED = 'CARD_FILTER_SUCCEEDED'
const CARD_FILTER_FAILED = 'CARD_FILTER_FAILED'

export function requestCardFiltering(filter) {
  return {
    type: CARD_FILTER_REQUESTED,
    payload: {
      filter,
    },
  }
}

export function* watchCardFiltering() {
  yield takeLatest(CARD_FILTER_REQUESTED, handleCardFiltering)
}

export function* handleCardFiltering(action) {
  try {
    const { filter } = action.payload
    const {
      authenticated,
      allTypesSelected,
      restaurantsSelected,
      dishesSelected,
      latitude,
      longitude,
      sectionSelected,
      sorting,
    } = filter
    // const response = { token: '123' } // yield call(faceBookAuthApi, accessToken)

    const sort = sorting

    let filtered = []
    if (sectionSelected === 'HC' || sectionSelected === 'FY') {
      const type = sectionSelected

      filtered = yield call(filterCardsApi, authenticated, latitude, longitude, sort, type)

      // if (sectionSelected === 'HC') { filtered.forEach(i => i.section = 'HC') }
    }
    if (sectionSelected === 'ALL') {
      filtered = yield call(filterCardsApi, authenticated, latitude, longitude, sort, null)
    }
    filtered = filterByType(filtered, allTypesSelected, restaurantsSelected, dishesSelected)
    /*
    if (sectionSelected === 'ALL') {
      const typeFY = 'FY'
      const filteredFY = yield call(filterCardsApi, authenticated, latitude, longitude, sort, typeFY)
      filtered = filtered.concat(filteredFY)

      const typeHC = 'HC'
      const filteredHC = yield call(filterCardsApi, authenticated, latitude, longitude, sort, typeHC)
      filteredHC.forEach(i => i.section = 'HC')
      filtered = filtered.concat(filteredHC)
      // filtered = filteredFY.concat(filteredHC)
      // filtered.push(filteredHC)

      //filtered = yield call(filterCardsApi, authenticated, latitude, longitude, sort, null)
      filtered = filterByType(filtered, allTypesSelected, restaurantsSelected, dishesSelected)
    } */

    const response = { filteredData: filtered }

    if (response.filteredData) {
      yield put({
        type: CARD_FILTER_SUCCEEDED,
        payload: {
          response,
        },
      })
    }


  } catch (e) {
    yield put({ type: CARD_FILTER_FAILED, message: e.message })
  }
}


export function reducer(state, action) {
  switch (action.type) {

  case CARD_FILTER_SUCCEEDED: {
    const { response } = action.payload
    return {
      ...state, filteredData: response.filteredData,
    }
  }

  default:
    return state
  }
}

function filterByType(filtered, allTypesSelected, restaurantsSelected, dishesSelected) {
  if (allTypesSelected) {
    return filtered
  }
  if (restaurantsSelected) {
    return filtered.filter(item => item.itemType === 'Restaurant')
  }
  if (dishesSelected) {
    return filtered.filter(item => item.itemType === 'MenuItem')
  }
}
export default reducer
