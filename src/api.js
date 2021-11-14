/* global __DEV__, __TESTING__, __DEVSERVER__ */
import queryString from 'query-string'
import _ from 'lodash'

// if running with webpack devserver, use CORS proxy
const proxy = __DEVSERVER__ ? 'http://localhost:8090/' : ''
// if build target is testing, query specific domain
export const base = __TESTING__
  ? 'https://testing-mobile-api.menumend.com'
  : 'https://mobile-api.menumend.com'


export const domain = `${proxy}${base}`


export function searchRestaurant(name, latitude, longitude) {
  const request = {
    name, latitude, longitude,
  }
  const stringified = queryString.stringify(request)
  const url = `${domain}/restaurants?${stringified}`
  return Promise.all([
    fetch(url),
  ]).then(([response]) =>
    response.json())
    .catch((err) => console.log(err))
}

export function searchCity(name) {
  if (typeof name !== 'string') {
    return []
  }
  const url = `${domain}/location/complete?q=${name}`
  return Promise.all([
    fetch(url),
  ]).then(([response]) =>
    response.json(),
  )
    .catch((err) => console.log(err))
}

export function getRestaurantInfo(locationId) {
  const url = `${domain}/restaurants/${locationId}`
  return fetch(url).then((response) => response.json())
}

export function getHealthyChoices(city) {
  if (city !== 'undef') {
    const geocodeUrl = `${domain}/location/geocode?address=${city}`
    const data = fetch(geocodeUrl)
      .then(response => response.json())
      .then(json => fetch(`${domain}/healthy_choices?latitude=${json.lat}&longitude=${json.lng}`).then((r) => r.json()))
    return data
  }
  const data = fetch(`${domain}/healthy_choices/`).then((response) => response.json())
  return data

}

export function getTopDishes(city) {
  if (city !== 'undef') {
    const geocodeUrl = `${domain}/location/geocode?address=${city}`
    const data = fetch(geocodeUrl)
      .then(response => response.json())
      .then(json => fetch(`${domain}/top_dishes?latitude=${json.lat}&longitude=${json.lng}`).then((r) => r.json()))
    return data
  }
  const data = fetch(`${domain}/top_dishes/`).then((response) => response.json())
  return data

}

export function toggleFavourite(method, token, section, itemType, itemId) {
  const url = `${domain}/favourites`
  const args = {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `${token}`,
    },
    body: JSON.stringify({ section, itemType, itemId }),
  }
  return fetch(url, args).then((response) => response.json())
}

export function getAllFavourites(token, section) {
  const url = `${domain}/favourites?section=${section}`
  const args = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': `${token}`,
    },
  }
  return fetch(url, args).then((response) => response.json())
}

export function getRestaurantMenus(locationId) {
  const url = `${domain}/restaurants/${locationId}/menus`
  return fetch(url).then((response) => response.json())
}

export function checkAvailability() {
  const url = `${domain}/location/available`
  return fetch(url).then((response) => response.json())
}


export function faceBookAuth(accessToken) {
  const url = `${domain}/users/facebook_auth`
  const args = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken }),
  }

  return fetch(url, args).then((response) => response.json(),
  )

}

export function emailSignup(email, password, firstName, lastName) {
  const url = `${domain}/users/signup`
  const args = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, firstName, lastName }),
  }

  return fetch(url, args).then((response) => response.json(),
  )

}

export function emailSignin(email, password, firstName, lastName) {
    const url = `${domain}/users/login`
    const args = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }

    return fetch(url, args).then((response) => response.json(),
    )

}

export function faceBookMe(token) {
  const url = `${domain}/users/me`
  const args = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
  }


  return fetch(url, args).then((response) => response.json(),
  )
}

export function logout(token) {
  const url = `${domain}/users/logout`
  const args = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
  }

  return fetch(url, args).then((response) => response.json(),
  )
}

export function getCuisines() {
  const url = `${domain}/data/cuisines.json`
  return fetch(url).then((response) => response.json())
}

export function getDiets() {
  const url = `${domain}/data/diets.json`
  return fetch(url).then((response) => response.json())
}

export function getAllergens() {
  const url = `${domain}/data/allergies.json`
  return fetch(url).then((response) => response.json())
}

export function getDislikedIngredients() {
  const url = `${domain}/data/ingredients.json`
  return fetch(url).then((response) => response.json())
}

export function getDishes() {
  const url = `${domain}/data/dishImages.json`
  return fetch(url).then((response) => response.json())
}

export function getCitySuggestions(name) {
  const stringified = queryString.stringify({
    name,
  })

  const url = `${domain}/location/cities?${stringified}`
  return fetch(url).then((response) => response.json())
}

export function nextQuestionnaireStep(profile) {
  const formattedProfile = {
    cuisines: profile.cuisines,
    disliked_ingredients: profile.dislikedIngredients,
    allergens: profile.allergens,
    diets: profile.diets,
    previous_answers: profile.previousAnswers,
  }

  const url = `${domain}/questionnaire`
  const options = {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formattedProfile),
  }

  return fetch(url, options).then((response) => response.json())
}

export function getTopCityRestaurants(cityData, answers) {
  const questionnaire = {
    cuisines: answers.cuisines,
    disliked_ingredients: answers.dislikedIngredients,
    allergens: answers.allergens,
    diets: answers.diets,
    previous_answers: answers.previousAnswers,
  }

  const body = {
    city: cityData.city,
    state: cityData.state,
    questionnaire,
  }

  const url = `${domain}/foryou/top_restaurants`
  const options = {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  return fetch(url, options).then((response) => response.json())
}

export function getTopCityDishes(cityData, answers) {
  const questionnaire = {
    cuisines: answers.cuisines,
    disliked_ingredients: answers.dislikedIngredients,
    allergens: answers.allergens,
    diets: answers.diets,
    previous_answers: answers.previousAnswers,
  }

  const body = {
    city: cityData.city,
    state: cityData.state,
    questionnaire,
  }

  const url = `${domain}/foryou/top_dishes`
  const options = {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  return fetch(url, options).then((response) => response.json())
}

export function filterCards(token, latitude, longitude, sort, section) {

  const request = {
    latitude, longitude, sort, section,
  }
  const stringified = queryString.stringify(request)
  const url = `${domain}/favourites?${stringified}`

  const args = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
  }


  return fetch(url, args).then((response) => response.json(),
  )
}
