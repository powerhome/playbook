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

import PbCollapsible from './pb_collapsible'
PbCollapsible.start()

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

import PbTextarea from './pb_textarea'
PbTextarea.start()

import 'flatpickr'

import 'trix'

// React-Rendered Rails Kits =====
import WebpackerReact from 'webpacker-react'
import * as ReactRailsPBKits from './react_rails_kits.js'
WebpackerReact.setup({ ...ReactRailsPBKits })
