// Charts
import pbChart from './plugins/pb_chart'
window.pbChart = pbChart

// Forms
import './pb_form/pb_form_validation'

// Lazy image loading
import 'lazysizes'

import PbPopover from './pb_popover'
PbPopover.start()

import PbTooltip from './pb_tooltip'
PbTooltip.start()

import PbTypeahead from './pb_typeahead'
PbTypeahead.start()

import PbTable from './pb_table'
PbTable.start()

// React-Rendered Rails Kits =====

import WebpackerReact from 'webpacker-react'

import BarGraph from './pb_bar_graph/_bar_graph.jsx'
import DistributionBar from './pb_distribution_bar/_distribution_bar.jsx'
import Legend from './pb_legend/_legend.jsx'
import LineGraph from './pb_line_graph/_line_graph.jsx'

WebpackerReact.setup({
  BarGraph,
  DistributionBar,
  Legend,
  LineGraph,
})
