// React-Rendered Rails Chart Kit Exports =====
// Requires: npm install highcharts highcharts-react-official
// This file should be imported AFTER playbook-rails.js

import ComponentRegistry from '../utils/componentRegistry'

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
