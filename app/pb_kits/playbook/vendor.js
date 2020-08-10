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
import * as ReactRailsPBKits from './react_rails_kits.js'
WebpackerReact.setup({ ...ReactRailsPBKits })
