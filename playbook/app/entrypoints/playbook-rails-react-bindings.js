// React-Rendered Rails Kit Exports =====

import ComponentRegistry from '../utils/componentRegistry'
import '../utils/mountComponent'

import DistributionBar from 'kits/pb_distribution_bar/_distribution_bar'
import MultiLevelSelect from 'kits/pb_multi_level_select/_multi_level_select'
import Passphrase from 'kits/pb_passphrase/_passphrase'
import RichTextEditor from 'kits/pb_rich_text_editor/_rich_text_editor'
import Typeahead from 'kits/pb_typeahead/_typeahead'
import PhoneNumberInput from 'kits/pb_phone_number_input/_phone_number_input'
import TimePicker from 'kits/pb_time_picker/_time_picker'

ComponentRegistry.registerComponents({
  DistributionBar,
  MultiLevelSelect,
  Passphrase,
  RichTextEditor,
  Typeahead,
  PhoneNumberInput,
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
