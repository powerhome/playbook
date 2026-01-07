// React-Rendered Rails Chart Kit Exports =====
// Requires: npm install highcharts highcharts-react-official

import ComponentRegistry from '../utils/componentRegistry'
import '../utils/mountComponent'

import PbBarGraph from 'kits/pb_pb_bar_graph/_pb_bar_graph'
import PbCircleChart from 'kits/pb_pb_circle_chart/_pb_circle_chart'
import PbLineGraph from 'kits/pb_pb_line_graph/_pb_line_graph'
import PbGaugeChart from 'kits/pb_pb_gauge_chart/_pb_gauge_chart'

ComponentRegistry.registerComponents({
  PbBarGraph,
  PbCircleChart,
  PbLineGraph,
  PbGaugeChart,
})

//export mount/unmount functions for use if needed
export const mountPlaybookReactKits = () => {
  ComponentRegistry.mountComponents()
}

export const unmountPlaybookReactKits = () => {
  ComponentRegistry.unmountComponents()
}
