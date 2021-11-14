export const SELECT_RESTAURANT = 'SELECT_SIGN_UP'
export const SELECT_DISH = 'SELECT_DISH'
export const SELECT_ALL_TYPES = 'SELECT_ALL_TYPES'

export function selectTypeRestaurants() {
  return {
    type: SELECT_RESTAURANT,
  }
}

export function selectTypeDishes() {
  return {
    type: SELECT_DISH,
  }
}

export function selectAllTypes() {
  return {
    type: SELECT_ALL_TYPES,
  }
}

export function reducer(state, action) {
  switch (action.type) {
  case SELECT_RESTAURANT: {
    return {
      ...state, restaurantsSelected: true, dishesSelected: false, allTypesSelected: false,
    }
  }
  case SELECT_DISH: {
    return {
      ...state, dishesSelected: true, restaurantsSelected: false, allTypesSelected: false,
    }
  }

  case SELECT_ALL_TYPES: {
    return {
      ...state, allTypesSelected: true, dishesSelected: false, restaurantsSelected: false,
    }
  }

  default:
    return state
  }
}

export default reducer
