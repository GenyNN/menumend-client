export const RESTAURANT_RESET = 'RESTAURANT_RESET'


export function resetRestaurant() {
  return { type: RESTAURANT_RESET }
}

export function reducer(state, action) {
  switch (action.type) {

  case RESTAURANT_RESET: {
    return { ...state, selected: {}, menus: [] }
  }

  default:
    return state
  }
}

export default reducer
