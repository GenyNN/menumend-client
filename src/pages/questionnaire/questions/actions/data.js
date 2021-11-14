import {
  REQUEST_CUISINES_SUCCEEDED,
  REQUEST_CUISINES_FAILED,
  REQUEST_DIETS_SUCCEEDED,
  REQUEST_DIETS_FAILED,
  REQUEST_ALLERGENS_SUCCEEDED,
  REQUEST_ALLERGENS_FAILED,
  REQUEST_DISLIKED_INGREDIENTS_SUCCEEDED,
  REQUEST_DISLIKED_INGREDIENTS_FAILED,
  REQUEST_DISHES_SUCCEEDED,
  REQUEST_DISHES_FAILED,
  REQUEST_SELECTION_DISHES_SUCCEEDED,
  REQUEST_SELECTION_DISHES_FAILED
} from '../sagas/data'

const initialState = {
  cuisines: [],
  diets: [],
  allergens: [],
  dislikedIngredients: [],
  dishes: [],
  selectionDishes: []
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DISHES_SUCCEEDED: {
      const { dishes } = action.payload
      return { ...state, dishes }
    }

    case REQUEST_DISHES_FAILED: {
      return { ...state, dishes: [] }
    }

    case REQUEST_CUISINES_SUCCEEDED: {
      const { cuisines } = action.payload
      return { ...state, cuisines }
    }

    case REQUEST_CUISINES_FAILED: {
      return { ...state, cuisines: [] }
    }

    case REQUEST_DIETS_SUCCEEDED: {
      const { diets } = action.payload
      return { ...state, diets }
    }

    case REQUEST_DIETS_FAILED: {
      return { ...state, diets: [] }
    }

    case REQUEST_ALLERGENS_SUCCEEDED: {
      const { allergens } = action.payload
      return { ...state, allergens }
    }

    case REQUEST_ALLERGENS_FAILED: {
      return { ...state, allergens: [] }
    }

    case REQUEST_DISLIKED_INGREDIENTS_SUCCEEDED: {
      const { dislikedIngredients } = action.payload
      return { ...state, dislikedIngredients }
    }

    case REQUEST_DISLIKED_INGREDIENTS_FAILED: {
      return { ...state, dislikedIngredients: [] }
    }

    case REQUEST_SELECTION_DISHES_SUCCEEDED: {
      const { selectionDishes } = action.payload
      return { ...state, selectionDishes }
    }

    case REQUEST_SELECTION_DISHES_FAILED: {
      return { ...state, selectionDishes: [] }
    }

    default:
      return state
  }
}

export default reducer
