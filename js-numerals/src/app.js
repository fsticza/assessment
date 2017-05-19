'use strict'

import {toWords} from '../index.js'

const formEl = document.querySelector('form[data-js="form"]')
const resultEl = formEl.result
const onSubmit = function (ev) {
  ev.preventDefault()
  resultEl.value = 'pending...'
  return toWords(parseInt(ev.target.value, 10))
    .then(result => {
      resultEl.value = result
      return result
    })
    .catch(err => {
      resultEl.value = err.message
    })
}

formEl.addEventListener('submit', onSubmit, false)
formEl.addEventListener('input', onSubmit, false)
