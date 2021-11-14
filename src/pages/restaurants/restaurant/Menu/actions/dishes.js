import { setCategory } from '../../actions/setCategory'

export const SELECT_DISH = 'SELECT_DISH'
export const UNSELECT_DISH = 'UNSELECT_DISH'


export function selectDish(id) {
  return (dispatch, getState) => {
    const state = getState()
    const { menus } = state.restaurant
    let menuIndex = 0
    menus.forEach((menu, index) => {
      if (!menu.sections) {
        return
      }
      menu.sections.forEach(section => {
        section.dishes.forEach(dish => {
          if (dish.id === id) {
            menuIndex = index
          }
        })
      })
    })
    dispatch(setCategory(menuIndex))
    dispatch({ type: SELECT_DISH, id })
  }
}

export function unselectDish() {
  return { type: UNSELECT_DISH }
}

const initialState = {
  selected: ''
}

export function reducer(state = initialState, action) {
  switch (action.type) {

  case SELECT_DISH: {
    return { ...state, selected: action.id }
  }

  case UNSELECT_DISH: {
    return { ...state, selected: '' }
  }

  default:
    return state
  }
}

export default reducer
