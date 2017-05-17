'use strict'

import numeral from '../index.js'

const form = document.querySelector('form[data-js="form"]')
const onSubmit = function (ev) {
  ev.preventDefault()
  console.log(numeral.toWords(ev.target.value))
}

form.addEventListener('submit', onSubmit, false)
form.addEventListener('input', onSubmit, false)
