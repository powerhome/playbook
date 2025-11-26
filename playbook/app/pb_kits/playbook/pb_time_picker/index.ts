import PbEnhancedElement from '../pb_enhanced_element'
import React from 'react'
import ReactDOM from 'react-dom'
import TimePicker from './_time_picker'

const TIME_PICKER_SELECTOR = '[data-pb-time-picker]'

interface TimePickerElement extends HTMLElement {
  _pbTimePickerMounted?: boolean
  _pbTimePickerContainer?: HTMLElement
  _reactRootContainer?: unknown
  _reactInternalInstance?: unknown
}

interface ReactContainer extends HTMLElement {
  _reactRootContainer?: unknown
  _reactInternalInstance?: unknown
}

export default class PbTimePicker extends PbEnhancedElement {
  static get selector(): string {
    return TIME_PICKER_SELECTOR
  }

  connect(): void {
    const element = this.element as TimePickerElement
    const propsData = element.getAttribute('data-pb-react-props')
    
    if (!propsData) return

    // Check if already mounted to prevent re-mounting
    if (element._pbTimePickerMounted) return

    // Find or create the React container
    let container = element.querySelector('.time_picker_react_container') as ReactContainer
    if (!container) {
      container = document.createElement('div')
      container.className = 'time_picker_react_container'
      element.appendChild(container)
    }

    // Check if React is already mounted in this container
    if (container._reactRootContainer || container._reactInternalInstance) {
      // Already mounted, don't re-mount
      element._pbTimePickerMounted = true
      element._pbTimePickerContainer = container
      return
    }

    // Defer mounting to next frame to avoid conflicts
    requestAnimationFrame(() => {
      // Double-check element is still connected
      if (!element.isConnected) return
      
      // Check again if mounted (race condition protection)
      if (element._pbTimePickerMounted) return

      try {
        const props = JSON.parse(propsData)
        // Use ReactDOM.render to match ComponentRegistry pattern
        ReactDOM.render(React.createElement(TimePicker, props), container)
        
        // Store references for cleanup
        element._pbTimePickerContainer = container
        element._pbTimePickerMounted = true
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error mounting TimePicker:', error)
      }
    })
  }

  disconnect(): void {
    const element = this.element as TimePickerElement
    if (!element._pbTimePickerMounted) return
    
    const container = element._pbTimePickerContainer || element.querySelector('.time_picker_react_container')
    if (container) {
      try {
        // Unmount React component
        ReactDOM.unmountComponentAtNode(container)
      } catch (error) {
        // Ignore errors during unmount (component may already be unmounted)
      }
      delete element._pbTimePickerContainer
      delete element._pbTimePickerMounted
    }
  }
}

