// React-Rendered Rails Kit Exports =====

import ComponentRegistry from '../utils/componentRegistry'
import '../utils/mountComponent'

import DistributionBar from 'kits/pb_distribution_bar/_distribution_bar'
import MultiLevelSelect from 'kits/pb_multi_level_select/_multi_level_select'
import Passphrase from 'kits/pb_passphrase/_passphrase'
import RichTextEditor from 'kits/pb_rich_text_editor/_rich_text_editor'
import Typeahead from 'kits/pb_typeahead/_typeahead'
import PhoneNumberInput from 'kits/pb_phone_number_input/_phone_number_input'
import PbBarGraph from 'kits/pb_pb_bar_graph/_pb_bar_graph'
import PbCircleChart from 'kits/pb_pb_circle_chart/_pb_circle_chart'
import PbLineGraph from 'kits/pb_pb_line_graph/_pb_line_graph'
import PbGaugeChart from 'kits/pb_pb_gauge_chart/_pb_gauge_chart'
import TimePicker from 'kits/pb_time_picker/_time_picker'

ComponentRegistry.registerComponents({
  DistributionBar,
  MultiLevelSelect,
  Passphrase,
  RichTextEditor,
  Typeahead,
  PhoneNumberInput,
  PbBarGraph,
  PbCircleChart,
  PbLineGraph,
  PbGaugeChart,
  TimePicker,
})

//export mount/unmount functions for use if needed
export const mountPlaybookReactKits = () => {
  ComponentRegistry.mountComponents()
}

export const unmountPlaybookReactKits = () => {
  ComponentRegistry.unmountComponents()
}

const observer = new MutationObserver(() => {
  mountPlaybookReactKits()
})

observer.observe(document.body, { childList: true, subtree: true })
