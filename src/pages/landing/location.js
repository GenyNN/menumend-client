import post from './post'

const modalElementId = 'modal-geo'
const options = {
  enableHighAccuracy: true,
  timeout: 15 * 1000,
  maximumAge: 30 * 1000,
}
const STORAGE = window.localStorage
const LOCATION_KEY = 'location'
const LOCATION_ERR_KEY = 'locationError'


function showEl(id) {
  const element = document.getElementById(id)
  if (!element) {
    return
  }
  element.classList.remove('hidden')
}


function hideEl(id) {
  const element = document.getElementById(id)
  if (!element) {
    return
  }
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden')
  }
}


function displayProgress() {
  const element = document.getElementById('geo-permit')
  if (!element.classList.contains('blink')) {
    element.classList.add('blink')
  }
  element.innerHTML = 'Locating'
}


function removeProgress() {
  const element = document.getElementById('geo-permit')
  element.classList.remove('blink')
  element.innerHTML = 'Allow'
}


function handleLocationSuccess(url) {
  return (position) => {
    const { latitude, longitude, accuracy } = position.coords
    const location = { latitude, longitude, accuracy }
    console.log('Got location', location)

    const stringifiedLocation = JSON.stringify(location)
    STORAGE.setItem(LOCATION_KEY, stringifiedLocation)
    window.open(url, '_self')
  }
}

function handleLocationError(url) {
  return (error) => {
    console.log('Failed to get location', error)

    const stringifiedLocationError = JSON.stringify({ error })
    STORAGE.setItem(LOCATION_ERR_KEY, stringifiedLocationError)
    window.open(url, '_self')
  }
}


function handleOpenModal(e) {
  if (e.preventDefault) {
    e.preventDefault()
  }
  showEl(modalElementId)

  return false
}


function handleCloseModal() {
  hideEl(modalElementId)
}


function handleForbidLocation(url) {
  return (e) => {
    if (e.preventDefault) {
      e.preventDefault()
    }
    window.open(url, '_self')
    // handleCloseModal()
    return false
  }
}


function handlePermitLocation(url) {
  return (e) => {
    if (e.preventDefault) {
      e.preventDefault()
    }
    const active = e.target.classList.contains('blink')
    if (active) {
      return false
    }
    displayProgress()
    navigator.geolocation.getCurrentPosition(handleLocationSuccess(url),
                                             handleLocationError(url),
                                             options)
    return false
  }
}

export default function bind() {
  STORAGE.removeItem(LOCATION_KEY)

  const closeButton = document.getElementById('modal-geo-close')
  closeButton.addEventListener('click', handleCloseModal)

  const proceedButton = document.getElementById('hc-card')
  const nextURL = proceedButton.getAttribute('href')
  proceedButton.addEventListener('click', handleOpenModal)

  const forbidLink = document.getElementById('geo-forbid')
  forbidLink.addEventListener('click', handleForbidLocation(nextURL))

  const permitButton = document.getElementById('geo-permit')
  permitButton.addEventListener('click', handlePermitLocation(nextURL))
}
