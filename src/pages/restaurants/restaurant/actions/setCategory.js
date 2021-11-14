export const SET_CATEGORY = 'SET_CATEGORY'


export function setCategory(id) {
  return { type: SET_CATEGORY, payload: { id } }
}

export function reducer(state, action) {
  switch (action.type) {

  case SET_CATEGORY: {
    return { ...state, menuCategoryIndex: action.payload.id }
  }

  default:
    return state
  }
}

export default reducer
