import React from 'react';
import ReactDOM from 'react-dom';

// React-Rendered Rails Kit Exports =====

import BarGraph from 'kits/pb_bar_graph/_bar_graph'
import CircleChart from 'kits/pb_circle_chart/_circle_chart'
import Dialog from 'kits/pb_dialog/_dialog'
import DialogBody from 'kits/pb_dialog/child_kits/_dialog_body'
import DialogFooter from 'kits/pb_dialog/child_kits/_dialog_footer'
import DialogHeader from 'kits/pb_dialog/child_kits/_dialog_header'
import DistributionBar from 'kits/pb_distribution_bar/_distribution_bar'
import Gauge from 'kits/pb_gauge/_gauge'
import Legend from 'kits/pb_legend/_legend'
import LineGraph from 'kits/pb_line_graph/_line_graph'
import MultiLevelSelect from 'kits/pb_multi_level_select/_multi_level_select'
import Passphrase from 'kits/pb_passphrase/_passphrase'
import RichTextEditor from 'kits/pb_rich_text_editor/_rich_text_editor'
import Typeahead from 'kits/pb_typeahead/_typeahead'
import PhoneNumberInput from 'kits/pb_phone_number_input/_phone_number_input'

// ===== Component Registry =====
const playbookComponents = {
  BarGraph,
  CircleChart,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DistributionBar,
  MultiLevelSelect,
  Legend,
  LineGraph,
  Passphrase,
  RichTextEditor,
  Typeahead,
  Gauge,
  PhoneNumberInput
}

// ===== Manual Mounting =====
export const mountPlaybookReactKits = () => {
  const nodes = document.querySelectorAll('[data-react-class]')

  nodes.forEach((node) => {
    const componentName = node.getAttribute('data-react-class')
    const rawProps = node.getAttribute('data-react-props')
    const Component = playbookComponents[componentName]

    if (Component && !node._playbookMounted) {
      const props = rawProps ? JSON.parse(rawProps) : {}

      ReactDOM.render(<Component {...props} />, node)
      node._playbookMounted = true
    }
  })
}

// ===== Manual Unmounting =====
export const unmountPlaybookReactKits = () => {
  const nodes = document.querySelectorAll('[data-react-class]')

  nodes.forEach((node) => {
    if (node._playbookMounted) {
      ReactDOM.unmountComponentAtNode(node)
      node._playbookMounted = false
    }
  })
}

// ===== Mount on Turbo events =====
document.addEventListener('turbo:load', mountPlaybookReactKits)
document.addEventListener('turbo:frame-load', mountPlaybookReactKits)

// ===== Mount on Turbolinks events =====
if (typeof window.Turbolinks !== "undefined") {
  document.addEventListener('turbolinks:load', mountPlaybookReactKits, { once: true })
  document.addEventListener('turbolinks:render', mountPlaybookReactKits)
  document.addEventListener('turbolinks:before-render', unmountPlaybookReactKits)
}

// ===== MutationObserver for dynamic content =====
const observer = new MutationObserver(() => {
  mountPlaybookReactKits()
})

observer.observe(document.body, { childList: true, subtree: true })