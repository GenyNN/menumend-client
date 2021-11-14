import post from './post'


function showSuccessMessage() {
  const successMessageEl = document.getElementById('modal-email-success-message')
  const errorMessageEl = document.getElementById('modal-email-error-message')
  const formEl = document.getElementById('modal-email-form')
  formEl.classList.add('hidden')
  successMessageEl.classList.remove('hidden')
  if (!errorMessageEl.classList.contains('hidden')) {
    errorMessageEl.classList.add('hidden')
  }
}

function showErrorMessage() {
  const errorMessageEl = document.getElementById('modal-email-error-message')
  if (errorMessageEl.classList.contains('hidden')) {
    errorMessageEl.classList.remove('hidden')
  }
}

function processForm(e) {
  if (e.preventDefault) {
    e.preventDefault()
  }
  const input = document.getElementById('modal-email-input')
  post(input.value, {
    success: showSuccessMessage,
    error: showErrorMessage,
    fail: () => {},
  })
  return false
}

function openModal(e) {
  if (e.preventDefault) {
    e.preventDefault()
  }
  const modalWindowEl = document.getElementById('modal-email')
  modalWindowEl.classList.add('opened');
  modalWindowEl.classList.remove('hidden');
  return false
}


function closeModal() {
  const modalWindowEl = document.getElementById('modal-email')
  if (!modalWindowEl.classList.contains('hidden')) {
    modalWindowEl.classList.add('hidden')
    modalWindowEl.classList.remove('opened');
  }
}


function bindOpenModal() {
  const elements = document.getElementsByClassName('card coming')
  if (!elements.length) {
    return
  }
  Array.from(elements).forEach(element => (
    element.addEventListener('click', openModal)
  ))
}


function bindCloseModal() {
  const element = document.getElementById('modal-email-close')
  element.addEventListener('click', closeModal)
}


export default function bind() {
  const form = document.getElementById('modal-email-form')
  form.addEventListener('submit', processForm)
  bindCloseModal()
  bindOpenModal()
}
