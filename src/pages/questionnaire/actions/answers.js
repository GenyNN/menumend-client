
export const TOGGLE_CUISINE = 'TOGGLE_CUISINE'
export const TOGGLE_DIET = 'TOGGLE_DIETS'
export const TOGGLE_ALLERGEN = 'TOGGLE_ALLERGEN'
export const TOGGLE_DISLIKED_INGREDIENT = 'TOGGLE_DISLIKED_INGREDIENT'

export const UPDATE_PREVIOUS_ANSWER = 'UPDATE_PREVIOUS_ANSWER'
export const UPDATE_PREVIOUS_SINGLE_ANSWER = 'UPDATE_PREVIOUS_SINGLE_ANSWER'

export const SET_TASTE_PROFILE = 'SET_TASTE_PROFILE'

export function toggleCuisine(cuisine) {
  return { type: TOGGLE_CUISINE, cuisine }
}
export function toggleDiet(diet) {
  return { type: TOGGLE_DIET, diet }
}
export function toggleAllergen(allergen) {
  return { type: TOGGLE_ALLERGEN, allergen }
}
export function toggleDislikedIngredient(ingredient) {
  return { type: TOGGLE_DISLIKED_INGREDIENT, ingredient }
}
export function updatePreviousAnswer(answer) {
  return { type: UPDATE_PREVIOUS_ANSWER, answer }
}
export function updatePreviousSingleAnswer(answer) {
  return { type: UPDATE_PREVIOUS_SINGLE_ANSWER, answer }
}

const initialState = {
  cuisines: [],
  diets: [],
  allergens: [],
  dislikedIngredients: [],
  previousAnswers: [],
  tasteProfile: null
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CUISINE: {
      const cuisines = [...state.cuisines]
      const index = cuisines.indexOf(action.cuisine)

      if (index === -1) {
        cuisines.push(action.cuisine)
      } else {
        cuisines.splice(index, 1);
      }

      return { ...state, cuisines }
    }

    case TOGGLE_DIET: {
      const diets = [...state.diets]
      const index = diets.indexOf(action.diet)

      if (index === -1) {
        diets.push(action.diet)
      } else {
        diets.splice(index, 1);
      }

      return { ...state, diets }
    }

    case TOGGLE_ALLERGEN: {
      const allergens = [...state.allergens]
      const index = allergens.indexOf(action.allergen)

      if (index === -1) {
        allergens.push(action.allergen)
      } else {
        allergens.splice(index, 1);
      }

      return { ...state, allergens }
    }

    case TOGGLE_DISLIKED_INGREDIENT: {
      const dislikedIngredients = [...state.dislikedIngredients]
      const index = dislikedIngredients.indexOf(action.ingredient)

      if (index === -1) {
        dislikedIngredients.push(action.ingredient)
      } else {
        dislikedIngredients.splice(index, 1);
      }

      return { ...state, dislikedIngredients }
    }

    case UPDATE_PREVIOUS_ANSWER: {
      let previousAnswers = state.previousAnswers.map(a => ({...a}))
      const index = previousAnswers.findIndex(a => {
        return a.id0 === action.answer.id0 && a.id1 === action.answer.id1
      })

      if (index === -1) {
        previousAnswers.push(action.answer)
      } else {
        previousAnswers[index] = action.answer
      }

      return { ...state, previousAnswers }
    }

    case UPDATE_PREVIOUS_SINGLE_ANSWER: {
      let previousAnswers = state.previousAnswers.map(a => ({...a}))
      const index = previousAnswers.findIndex(a => {
        return !a.id1 && a.id0 === action.answer.id0
      })

      if (index === -1) {
        previousAnswers.push(action.answer)
      } else {
        previousAnswers[index] = action.answer
      }

      return { ...state, previousAnswers }
    }

    case SET_TASTE_PROFILE: {
      let { tasteProfile } = action
      return { ...state, tasteProfile }
    }

    default:
      return state
  }
}

export default reducer
