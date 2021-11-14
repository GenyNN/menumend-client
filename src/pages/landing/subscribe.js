import post from './post'


function showSuccessMessage() {
  const successMessageEl = document.getElementById('email-success-message')
  const errorMessageEl = document.getElementById('email-error-message')
  const formEl = document.getElementById('email-form')
  formEl.classList.add('hidden')
  successMessageEl.classList.remove('hidden')
  if (!errorMessageEl.classList.contains('hidden')) {
    errorMessageEl.classList.add('hidden')
  }
}

function showErrorMessage() {
  const errorMessageEl = document.getElementById('email-error-message')
  if (errorMessageEl.classList.contains('hidden')) {
    errorMessageEl.classList.remove('hidden')
  }
}


function processForm(e) {
  if (e.preventDefault) {
    e.preventDefault()
  }
  const input = document.getElementById('email-input')
  post(input.value, {
    success: showSuccessMessage,
    error: showErrorMessage,
    fail: () => {},
  })
  return false
}


export default function bind() {
  const form = document.getElementById('email-form')
  form.addEventListener('submit', processForm)
}
