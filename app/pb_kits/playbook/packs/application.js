import '../../../../fonts/fontawesome.min.js'
import '../../../../fonts/regular.min.js'
import './main.scss'
import './kits.js'
import '../vendor.js'

// Move to separate file
$(document).on('click', '[data-toggle]', function(e) {
  e.preventDefault()
  var kit_container = $(this).closest('.pb--doc')
  var toggle_target = $(this).data('toggle')
  $(kit_container).find('[data-action="toggle"]').hide()
  $(kit_container).find('[data-togglable="'+toggle_target+'"]').show()
})
