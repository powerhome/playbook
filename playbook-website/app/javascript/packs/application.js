/* eslint no-console:0 */

import WebpackerReact from 'webpacker-react'
import zxcvbn from 'zxcvbn'
window.zxcvbn = zxcvbn

import 'playbook-ui/dist/playbook-rails'
import 'playbook-ui/dist/playbook-doc' // playbook-react doc components
import '@fortawesome/fontawesome-pro/css/all'
import '@fortawesome/fontawesome-pro/js/all'

import '../site_styles/main.scss'

import DarkModeToggle from '../components/DarkModeToggle'
import KitSearch from '../components/KitSearch'
import SnippetToggle from '../components/SnippetToggle'
import Sidebar from '../components/Sidebar'
import KitDocs from '../components/KitDocs'
import KitDemo from '../components/KitDemo'

WebpackerReact.setup({
  DarkModeToggle,
  KitSearch,
  SnippetToggle,
  Sidebar,
  KitDocs,
  KitDemo,
})

// Produce image assets
require.context('../images', true)
// const imagePath = (name) => images(name, true)
