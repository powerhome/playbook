// React-Rendered Rails Kit Exports =====

import WebpackerReact from 'webpacker-react'
import ujs from 'webpacker-react/ujs'

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
  Typeahead,
  Gauge,
  PhoneNumberInput
})

ujs.setup(
  () => WebpackerReact.mountComponents(),
  () => WebpackerReact.unmountComponents()
)
