import '@testing-library/jest-dom';
import failOnConsole from 'jest-fail-on-console'

import * as icons from "@powerhome/playbook-icons-react"

failOnConsole()

// or with options:
failOnConsole({
  shouldFailOnWarn: false,
})

window.PB_ICONS = {}

function pascalToKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2')
    .toLowerCase()
    // Heading icons export as H1..H6 but icon props use h1..h6 (no hyphen)
    .replace(/^h-(\d)$/, 'h$1')
}

Object.entries(icons).forEach(([key, value]) => {
  const iconName = pascalToKebabCase(key)
  window.PB_ICONS[iconName] = value
})