// ===========================================
// Generated file from kit generator.
//
// KIT EXAMPLES
// ===========================================

import WebpackerReact from 'webpacker-react'

//
// ===========================================
// ===========================================
// Generated file from kit generator.
// KIT EXAMPLES

import Dashboards from '../../../views/playbook/samples/dashboards/dashboards.jsx'

WebpackerReact.setup({ Dashboards })

// window.$(document).on('click', '[data-toggle]', function(e) {
//   e.preventDefault()

//   var kitContainer = window.$(this).closest('.pb--doc')
//   var toggleTarget = window.$(this).data('toggle')

//   window.$(kitContainer).find('[data-action="toggle"]').hide()
//   window.$(kitContainer).find('[data-togglable="' + toggleTarget + '"]').show()
// })

window.$(document).on('click', '.toggle-button', (e) => {
  e.preventDefault()
  $('.pb--codeCopy').show()
})
