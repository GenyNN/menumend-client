/* global __DEV__, __TESTING__, __DEVSERVER__, AOS */
import axios from 'axios'
// if running in dev mode, use CORS proxy
const proxy = __DEV__ ? 'http://localhost:8090/' : ''
// if build target is testing, query specific domain
const base = __TESTING__
  ? 'https://testing-mobile-api.menumend.com'
  : 'https://mobile-api.menumend.com'

const domain = `${proxy}${base}`

export default function post(value) {
  const data = JSON.stringify({ email: value })
  const headers = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }

  axios.post(`${domain}/landing/email`, data, headers)
    .then((response) =>
      console.log(response)
    )
    .catch((response) =>
      console.log(response)
    )
}
