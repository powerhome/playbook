// Forms
import 'kits/pb_form/pb_form_validation'

// Date Picker
import datePickerHelper from 'kits/pb_date_picker/date_picker_helper'
window.datePickerHelper = datePickerHelper

// Dialog
import dialogHelper from 'kits/pb_dialog/dialogHelper'
window.dialogHelper = dialogHelper

// Lazy image loading
import 'lazysizes'

import PbCollapsible from 'kits/pb_collapsible'
PbCollapsible.start()

import PbPopover from 'kits/pb_popover'
PbPopover.start()

import PbTooltip from 'kits/pb_tooltip'
PbTooltip.start()

import PbFixedConfirmationToast from 'kits/pb_fixed_confirmation_toast'
PbFixedConfirmationToast.start()

import PbTypeahead from 'kits/pb_typeahead'
PbTypeahead.start()

import PbTable from 'kits/pb_table'
PbTable.start()

import PbTextarea from 'kits/pb_textarea'
PbTextarea.start()

import PbDropdown from 'kits/pb_dropdown'
PbDropdown.start()

import PbAdvancedTable from 'kits/pb_advanced_table'
PbAdvancedTable.start()

import 'flatpickr'

// React-Rendered Rails Kits =====
import './playbook-rails-react-bindings'
