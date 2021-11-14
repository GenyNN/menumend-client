export const SEARCH_RESET = 'SEARCH_RESET'


export function resetSearch() {
  return { type: SEARCH_RESET }
}

export function reducer(state, action) {
  switch (action.type) {

  case SEARCH_RESET: {
    return { ...state, restaurants: [], cities: [] }
  }

  default:
    return state
  }
}

export default reducer
