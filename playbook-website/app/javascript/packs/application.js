/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import WebpackerReact from 'webpacker-react'

import 'playbook-ui/dist/playbook-rails' // playbook-rails JS
import 'playbook-ui/dist/playbook-doc' // playbook-react doc components
import 'playbook-ui/dist/fonts/fontawesome-min'
import 'playbook-ui/dist/fonts/regular-min'

import DarkModeToggle from '../components/DarkModeToggle'
import KitSearch from '../components/KitSearch'
import SnippetToggle from '../components/SnippetToggle'

WebpackerReact.setup({
  DarkModeToggle,
  KitSearch,
  SnippetToggle,
})
