import '../../../../fonts/fontawesome.min.js'
import '../../../../fonts/regular.min.js'
import './main.scss'
import './kits.js'
import '../vendor.js'

// Move to separate file
window.$(document).on('click', '[data-toggle]', function(e) {
  e.preventDefault()

  var kitContainer = window.$(this).closest('.pb--doc')
  var toggleTarget = window.$(this).data('toggle')

  window.$(kitContainer).find('[data-action="toggle"]').hide()
  window.$(kitContainer).find('[data-togglable="' + toggleTarget + '"]').show()
})
