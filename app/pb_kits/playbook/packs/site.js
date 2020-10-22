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
