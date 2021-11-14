import {
  SET_CURRENT_CITY,
  REQUEST_TOP_CITY_RESTAURANTS_SUCCEEDED,
  REQUEST_TOP_CITY_DISHES_SUCCEEDED,
  RESTAURANT_SUCCEEDED,
  RESTAURANT_SELECT,
  RESTAURANT_FAILED,
  RESTAURANT_RESET,
  REQUEST_CITY_SUGGESTIONS_SUCCEEDED,
  RESET_CITY_SUGGESTIONS, SET_CATEGORY
} from '../sagas/data'

const initialState = {
  topRestaurants: [],
  topDishes: [],
  currentCity: null,
  menus: [],
  menuCategoryIndex: 0,
  citySuggestions: []
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CITY: {
      const { city } = action
      return { ...state, currentCity: city }
    }

    case SET_CATEGORY: {
      return { ...state, menuCategoryIndex: action.payload.id }
    }

    case REQUEST_TOP_CITY_RESTAURANTS_SUCCEEDED: {
      const { restaurants } = action.payload
      return { ...state, topRestaurants: restaurants }
    }

    case REQUEST_TOP_CITY_DISHES_SUCCEEDED: {
      const { dishes } = action.payload
      return { ...state, topDishes: dishes }
    }

    case RESTAURANT_SELECT: {
      return { ...state, selected: action.payload.data, menus: [], menuCategoryIndex: 0 }
    }

    case RESTAURANT_RESET: {
      return { ...state, selected: {}, menus: [], menuCategoryIndex: 0 }
    }

    case RESTAURANT_SUCCEEDED: {
      const { restaurantRsp, menusRsp } = action.payload
      return { ...state, menus: menusRsp.menus }
    }

    case RESTAURANT_FAILED: {
      return { ...state, selected: {}, menus: [], menuCategoryIndex: 0 }
    }

    case REQUEST_CITY_SUGGESTIONS_SUCCEEDED: {
      const { suggestions } = action.payload
      return { ...state, citySuggestions: suggestions }
    }

    case RESET_CITY_SUGGESTIONS: {
      return { ...state, citySuggestions: [] }
    }

    default:
      return state
  }
}

export default reducer
