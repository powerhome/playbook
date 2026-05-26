/* eslint no-console:0 */

import '../utilities/mountComponent'
import ComponentRegistry from '../utilities/componentRegistry'

import zxcvbn from 'zxcvbn'
window.zxcvbn = zxcvbn

import 'playbook-ui/dist/playbook-rails.js'
import 'playbook-ui/dist/playbook-rails-charts.js'
import '../../../../playbook/app/javascript/playbook-doc.js'

import '../site_styles/main.scss'

import { Website } from 'components/app'
import { Turbo } from "@hotwired/turbo-rails"

// Icons from playbook-icons-react for testing
import * as icons from "@powerhome/playbook-icons-react"

window.PB_ICONS = {}

function pascalToKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2')
    .toLowerCase(); 
}

Object.entries(icons).forEach(([key, value]) => {
  const iconName = pascalToKebabCase(key)
  window.PB_ICONS[iconName] = value
})

Turbo.session.drive = false

ComponentRegistry.registerComponents({
  Website,
})
