import '../../../../fonts/fontawesome.min.js'
import '../../../../fonts/regular.min.js'
import './main.scss'
import '../vendor.js'

// Move to separate file
window.$(document).on('click', '[data-toggle]', function(e) {
  e.preventDefault()

  var kitContainer = window.$(this).closest('.pb--doc')
  var toggleTarget = window.$(this).data('toggle')

  window
    .$(kitContainer)
    .find('[data-action="toggle"]')
    .hide()
  window
    .$(kitContainer)
    .find('[data-togglable="' + toggleTarget + '"]')
    .show()
})

window.$(document).ready(() => {
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
})
