/* eslint no-console:0 */

import WebpackerReact from 'webpacker-react'

import zxcvbn from 'zxcvbn'
window.zxcvbn = zxcvbn

import 'playbook-ui/dist/playbook-rails.js'
import 'playbook-ui/dist/playbook-doc.js'
import '@fortawesome/fontawesome-pro/js/fontawesome.min.js'
import '@fortawesome/fontawesome-pro/js/regular.min.js'
import '@fortawesome/fontawesome-pro/js/brands.min.js'

import '../site_styles/main.scss'

import copyContent from 'components/copyCode'
window.copyContent = copyContent

import DarkModeToggle from 'components/Website/src/components/DarkModeToggle'
import KitSearch from 'components/KitSearch'
import SnippetToggle from 'components/SnippetToggle'
import KitDocs from 'components/KitDocs'
import PbKitReact from 'components/PbKitReact'
import PbKitFetch from 'components/PbKitFetch'
import PbKitPlayground from 'components/PbKitPlayground'
import AvailableProps from 'components/AvailableProps'
import MainSidebar from 'components/MainSidebar'
import HomepageHero from 'components/HomepageHero'
import AiAssistant from 'components/AiAssistant'
import AnchorJS from 'anchor-js'
import { Website } from 'components/app'
import { Turbo } from "@hotwired/turbo-rails"

Turbo.session.drive = false

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

document.addEventListener('DOMContentLoaded', () => {
  const anchors = new AnchorJS()
  anchors.add('.pb--kit-example > .pb_caption_kit_md:first-child')
  const propsTableAnchors = new AnchorJS()
  propsTableAnchors.options = {
    class: 'props-table-anchor',
  }
  propsTableAnchors.add('.pb--propsTable > .pb_title_kit_3')
})

WebpackerReact.registerComponents({
  AvailableProps,
  DarkModeToggle,
  KitSearch,
  SnippetToggle,
  KitDocs,
  PbKitReact,
  PbKitFetch,
  PbKitPlayground,
  MainSidebar,
  Website,
  HomepageHero,
  AiAssistant
})
