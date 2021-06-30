// React-Rendered Rails Kit Exports =====

import WebpackerReact from 'webpacker-react'
import ujs from 'webpacker-react/ujs'

import BarGraph from './pb_bar_graph/_bar_graph'
import Dialog from './pb_dialog/_dialog'
import DialogBody from './pb_dialog/child_kits/_dialog_body'
import DialogFooter from './pb_dialog/child_kits/_dialog_footer'
import DialogHeader from './pb_dialog/child_kits/_dialog_header'
import DistributionBar from './pb_distribution_bar/_distribution_bar'
import Legend from './pb_legend/_legend'
import LineGraph from './pb_line_graph/_line_graph'
import Passphrase from './pb_passphrase/_passphrase'
import RichTextEditor from './pb_rich_text_editor/_rich_text_editor'
import Typeahead from './pb_typeahead/_typeahead'

WebpackerReact.registerComponents({
  BarGraph,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DistributionBar,
  Legend,
  LineGraph,
  Passphrase,
  RichTextEditor,
  Typeahead,
})

ujs.setup(
  () => WebpackerReact.mountComponents(),
  () => WebpackerReact.unmountComponents()
)
