// React-Rendered Rails Kit Exports =====

import WebpackerReact from 'webpacker-react'
import ujs from 'webpacker-react/ujs'

import BarGraph from './pb_bar_graph/_bar_graph'
import CircleChart from './pb_circle_chart/_circle_chart'
import Dialog from './pb_dialog/_dialog'
import DialogBody from './pb_dialog/child_kits/_dialog_body'
import DialogFooter from './pb_dialog/child_kits/_dialog_footer'
import DialogHeader from './pb_dialog/child_kits/_dialog_header'
import DistributionBar from './pb_distribution_bar/_distribution_bar'
//import Gauge from './pb_gauge/_gauge'
import Legend from './pb_legend/_legend'
import LineGraph from './pb_line_graph/_line_graph'
import MultiLevelSelect from './pb_multi_level_select/_multi_level_select'
import Passphrase from './pb_passphrase/_passphrase'
import RichTextEditor from './pb_rich_text_editor/_rich_text_editor'
//import TreemapChart from './pb_treemap_chart/_treemap_chart'
import Typeahead from './pb_typeahead/_typeahead'
import PhoneNumberInput from './pb_phone_number_input/_phone_number_input'

WebpackerReact.registerComponents({
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
  //TreemapChart,
  Typeahead,
  //Gauge,
  PhoneNumberInput
})

ujs.setup(
  () => WebpackerReact.mountComponents(),
  () => WebpackerReact.unmountComponents()
)
