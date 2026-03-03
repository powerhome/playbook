// ============================================
// Global Kit Registry: Single MutationObserver for ALL kits
// ============================================
import PbKitRegistry from 'kits/pb_kit_registry'

// Import all kits
import PbTextInput from 'kits/pb_text_input'
import { PbCopyButton, addCopyEventListeners } from 'kits/pb_copy_button'
import PbCollapsible from 'kits/pb_collapsible'
import PbPopover from 'kits/pb_popover'
import PbTooltip from 'kits/pb_tooltip'
import PbFixedConfirmationToast from 'kits/pb_fixed_confirmation_toast'
import PbTypeahead from 'kits/pb_typeahead'
import PbTable from 'kits/pb_table'
import PbTextarea from 'kits/pb_textarea'
import PbDropdown from 'kits/pb_dropdown'
import PbAdvancedTable from 'kits/pb_advanced_table'
import PbFlatAdvancedTable from 'kits/pb_advanced_table/flat_advanced_table'
import PbNav from 'kits/pb_nav'
import PbStarRating from 'kits/pb_star_rating'
import PbRadio from 'kits/pb_radio'
import PbDraggable from 'kits/pb_draggable'
import PbOverlay from 'kits/pb_overlay'
import PbSelect from 'kits/pb_select'
import PbDialog from 'kits/pb_dialog'
import PbDatePicker from 'kits/pb_date_picker'
import PbMultiLevelSelect from 'kits/pb_multi_level_select'
import PbCheckbox from 'kits/pb_checkbox'
import PbButton from 'kits/pb_button'
import PbTimePicker from 'kits/pb_time_picker'

// Register all kits with the global registry
// Please note: the order of this array determines the order of kit initialization, which can be important for kits that depend on others (e.g., a kit that enhances a text input should be registered after PbTextInput)
const kits = [
  PbTextInput,
  PbCopyButton,
  PbCollapsible,
  PbPopover,
  PbTooltip,
  PbFixedConfirmationToast,
  PbTypeahead,
  PbTable,
  PbTextarea,
  PbDropdown,
  PbAdvancedTable,
  PbFlatAdvancedTable,
  PbNav,
  PbStarRating,
  PbRadio,
  PbDraggable,
  PbOverlay,
  PbSelect,
  PbDialog,
  PbDatePicker,
  PbMultiLevelSelect,
  PbCheckbox,
  PbButton,
  PbTimePicker,
]

// Register all kits (this just stores them, doesn't initialize yet)
kits.forEach(kit => PbKitRegistry.register(kit))

// Single start call: creates ONE MutationObserver for ALL kits
// This replaces 20+ individual kit.start() calls from legacy code
PbKitRegistry.start()

// ============================================
// Non-enhanced-element utilities
// ============================================

// Copy Button
addCopyEventListeners()

// Form utilities
import 'kits/pb_form/pb_form_validation'
import formHelper from 'kits/pb_form/formHelper'
window.formHelper = formHelper

// Date picker helper
import datePickerHelper from 'kits/pb_date_picker/date_picker_helper'
window.datePickerHelper = datePickerHelper

// Third-party libraries
import 'lazysizes'
import 'flatpickr'

// React-Rendered Rails Kits
import './playbook-rails-react-bindings'
