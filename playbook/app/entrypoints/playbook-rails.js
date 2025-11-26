// Text Input
import PbTextInput from 'kits/pb_text_input'
PbTextInput.start()

// Copy Button
import { PbCopyButton, addCopyEventListeners } from 'kits/pb_copy_button'
PbCopyButton.start()
addCopyEventListeners()

// Forms
import 'kits/pb_form/pb_form_validation'
import formHelper from 'kits/pb_form/formHelper'
window.formHelper = formHelper

// Date Picker
import datePickerHelper from 'kits/pb_date_picker/date_picker_helper'
window.datePickerHelper = datePickerHelper

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

import PbFlatAdvancedTable from 'kits/pb_advanced_table/flat_advanced_table'
PbFlatAdvancedTable.start()

import PbNav from 'kits/pb_nav'
PbNav.start()

import PbStarRating from 'kits/pb_star_rating'
PbStarRating.start()

import PbRadio from 'kits/pb_radio'
PbRadio.start()

import PbDraggable from 'kits/pb_draggable'
PbDraggable.start()

import PbOverlay from 'kits/pb_overlay'
PbOverlay.start()

import PbSelect from 'kits/pb_select'
PbSelect.start()

import PbDialog from 'kits/pb_dialog'
PbDialog.start()

import PbDatePicker from 'kits/pb_date_picker'
PbDatePicker.start()

import PbTimePicker from 'kits/pb_time_picker'
PbTimePicker.start()

import PbMultiLevelSelect from 'kits/pb_multi_level_select'
PbMultiLevelSelect.start()

import PbCheckbox from 'kits/pb_checkbox'
PbCheckbox.start()

import PbButton from 'kits/pb_button'
PbButton.start()

import 'flatpickr'

// React-Rendered Rails Kits =====
import './playbook-rails-react-bindings'
