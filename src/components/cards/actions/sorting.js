export const SELECT_SORTING_DATE = 'SELECT_SORTING_DATE'
export const SELECT_SORTING_DISTANCE = 'SELECT_SORTING_DISTANCE'
export const SELECT_SORTING_NAME = 'SELECT_SORTING_NAME'

export function selectSortingDate() {
  return {
    type: SELECT_SORTING_DATE,
  }
}

export function selectSortingDistance() {
  return {
    type: SELECT_SORTING_DISTANCE,
  }
}

export function selectSortingName() {
  return {
    type: SELECT_SORTING_NAME,
  }
}

export function reducer(state, action) {
  switch (action.type) {
  case SELECT_SORTING_DATE: {
    return {
      ...state, sorting: 'createdAt',
    }
  }

  case SELECT_SORTING_DISTANCE: {
    return {
      ...state, sorting: 'distance',
    }
  }

  case SELECT_SORTING_NAME: {
    return {
      ...state, sorting: 'name',
    }
  }

  default:
    return state
  }
}

export default reducer
