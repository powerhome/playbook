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

// Debounce to prevent excessive remounting during rapid DOM changes
let mountTimeout = null
const debouncedMount = () => {
  if (mountTimeout) clearTimeout(mountTimeout)
  mountTimeout = setTimeout(() => {
    mountPlaybookReactKits()
    mountTimeout = null
  }, 50)
}

const observer = new MutationObserver((mutations) => {
  // Only respond to mutations that add new nodes with PB components
  const hasNewPbComponents = mutations.some((mutation) => {
    return Array.from(mutation.addedNodes).some((node) => {
      if (node.nodeType !== 1) return false
      return (
        node.hasAttribute?.('data-pb-react-component') ||
        node.querySelector?.('[data-pb-react-component]')
      )
    })
  })
  
  if (hasNewPbComponents) {
    debouncedMount()
  }
})

observer.observe(document.body, { childList: true, subtree: true })
