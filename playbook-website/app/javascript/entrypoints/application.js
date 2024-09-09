/* eslint no-console:0 */

import WebpackerReact from 'webpacker-react'

import zxcvbn from 'zxcvbn'
window.zxcvbn = zxcvbn

import 'playbook-ui/dist/playbook-rails.js'
import 'playbook-ui/dist/playbook-doc.js'

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
import AnchorJS from 'anchor-js'
import { Website } from 'components/app'
import { Turbo } from "@hotwired/turbo-rails"

Turbo.session.drive = false

// Icons from playbook-icons-react for testing

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
})
