export const SELECT_FY = 'SELECT_FY'
export const SELECT_HC = 'SELECT_HC'
export const SELECT_ALL = 'SELECT_ALL'

export function selectSectionFY() {
  return {
    type: SELECT_FY,
  }
}

export function selectSectionHC() {
  return {
    type: SELECT_HC,
  }
}

export function selectSectionALL() {
  return {
    type: SELECT_ALL,
  }
}

export function reducer(state, action) {
  switch (action.type) {
  case SELECT_FY: {
    return {
      ...state, sectionSelected: 'FY',
    }
  }
  case SELECT_HC: {
    return {
      ...state, sectionSelected: 'HC',
    }
  }
  case SELECT_ALL: {
    return {
      ...state, sectionSelected: 'ALL',
    }
  }


  default:
    return state
  }
}

export default reducer
