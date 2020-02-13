// ===========================================
// Generated file from kit generator.
//
// ===========================================

import WebpackerReact from 'webpacker-react'

//
// ===========================================
// ===========================================
// Generated file from kit generator.

import Dashboards from '../../../views/playbook/samples/dashboards/dashboards.jsx'

WebpackerReact.setup({ Dashboards })

$('.pb--codeCopy').show()
$('.compress').hide()

window.$(document).on('click', '.toggle-button', (e) => {
  e.preventDefault()
  $('.pb--codeCopy').toggleClass('close')
})

$('.expand').click(() => {
  $('.sample-nav').hide()
  $('.compress').show()
})

$('.compress').click(() => {
  $('.sample-nav').show()
  $('.compress').hide()
})

const setClipboard = (value) => {
  var tempInput = document.createElement('textarea')
  tempInput.style = 'position: absolute; left: -1000px; top: -1000px'
  tempInput.value = value
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand('copy')
  document.body.removeChild(tempInput)
}

$('.copy-clipboard').click(() => {
  var copyText = document.querySelector('.hiddenCodeforCopy').textContent
  setClipboard(copyText)
})

