// Charts
import pbChart from './plugins/pb_chart'
window.pbChart = pbChart

// Forms
import './pb_form/pb_form_validation'

// Date Picker
import datePickerHelper from './pb_date_picker/date_picker_helper.js'
window.datePickerHelper = datePickerHelper

// Lazy image loading
import 'lazysizes'

import PbPopover from './pb_popover'
PbPopover.start()

import PbTooltip from './pb_tooltip'
PbTooltip.start()

import PbFixedConfirmationToast from './pb_fixed_confirmation_toast'
PbFixedConfirmationToast.start()

import PbTypeahead from './pb_typeahead'
PbTypeahead.start()

import PbTable from './pb_table'
PbTable.start()

import 'flatpickr'

import 'trix'

// React-Rendered Rails Kits =====
import WebpackerReact from 'webpacker-react'
import BarGraph from './pb_bar_graph/_bar_graph.jsx'
import DistributionBar from './pb_distribution_bar/_distribution_bar.jsx'
import Legend from './pb_legend/_legend.jsx'
import LineGraph from './pb_line_graph/_line_graph.jsx'
import Typeahead from './pb_typeahead/_typeahead.jsx'
import RichTextEditor from './pb_rich_text_editor/_rich_text_editor.jsx'
WebpackerReact.setup({ BarGraph, DistributionBar, Legend, LineGraph, Typeahead, RichTextEditor })
