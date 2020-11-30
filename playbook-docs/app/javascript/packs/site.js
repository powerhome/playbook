// Move to separate file
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-toggle]').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
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
  })
})
