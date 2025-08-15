import React from 'react'
import { createRoot } from 'react-dom/client'

const CLASS_ATTRIBUTE_NAME = 'data-react-class'
const PROPS_ATTRIBUTE_NAME = 'data-react-props'

class PlaybookRenderer {
  constructor() {
    this.registeredComponents = {}
    this.mountedRoots = new Map() // Store React roots for proper cleanup
  }

  /**
   * Register React components for rendering
   * @param {Object} components - Object containing component name -> component mappings
   */
  registerComponents(components) {
    const collisions = Object.keys(this.registeredComponents).filter(key => 
      Object.prototype.hasOwnProperty.call(components, key)
    )
    
    if (collisions.length > 0) {
      console.error(`PlaybookRenderer: Cannot register components. Following components are already registered: ${collisions.join(', ')}`)
      return false
    }

    Object.assign(this.registeredComponents, components)
    return true
  }

  /**
   * Render a single component using React 19's createRoot API
   * @param {HTMLElement} node - DOM node to render into
   * @param {React.Component} component - React component to render
   */
  render(node, component) {
    try {
      const propsJson = node.getAttribute(PROPS_ATTRIBUTE_NAME)
      const props = propsJson ? JSON.parse(propsJson) : {}

      const reactElement = React.createElement(component, props)
      
      // Create root using React 19 API
      const root = createRoot(node)
      root.render(reactElement)
      
      // Store the root for cleanup
      this.mountedRoots.set(node, root)
      
      // Mark node as mounted
      node.setAttribute('data-playbook-mounted', 'true')
    } catch (error) {
      console.error('PlaybookRenderer: Error rendering component:', error)
    }
  }

  /**
   * Unmount all React components
   */
  unmountComponents() {
    // Find all mounted nodes
    const mountedNodes = document.querySelectorAll('[data-playbook-mounted="true"]')
    
    mountedNodes.forEach(node => {
      const root = this.mountedRoots.get(node)
      if (root) {
        try {
          root.unmount()
          this.mountedRoots.delete(node)
          node.removeAttribute('data-playbook-mounted')
        } catch (error) {
          console.error('PlaybookRenderer: Error unmounting component:', error)
        }
      }
    })
  }

  /**
   * Mount all React components found in the DOM
   */
  mountComponents() {
    const toMount = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}]`)

    toMount.forEach(node => {
      // Skip if already mounted
      if (node.getAttribute('data-playbook-mounted') === 'true') {
        return
      }

      const className = node.getAttribute(CLASS_ATTRIBUTE_NAME)
      const component = this.registeredComponents[className]

      if (component) {
        // Only render if node is empty or contains no React content
        if (node.innerHTML.trim().length === 0 || !node.hasAttribute('data-playbook-mounted')) {
          this.render(node, component)
        }
      } else {
        console.error(`PlaybookRenderer: Cannot render unregistered component: ${className}`)
      }
    })
  }

  /**
   * Setup automatic mounting/unmounting for various navigation systems
   * @param {Function} onMount - Custom mount callback
   * @param {Function} onUnmount - Custom unmount callback
   */
  setup(onMount, onUnmount) {
    const mountCallback = onMount || this.mountComponents.bind(this)
    const unmountCallback = onUnmount || this.unmountComponents.bind(this)

    // Detect navigation system and set up appropriate event handlers
    this.setupEventHandlers(mountCallback, unmountCallback)
    
    // Initial mount on setup
    mountCallback()
  }

  /**
   * Setup event handlers for different navigation systems
   * @param {Function} onMount - Mount callback
   * @param {Function} onUnmount - Unmount callback
   */
  setupEventHandlers(onMount, onUnmount) {
    const { Turbo } = window
    const { Turbolinks } = window
    const $ = (typeof window.jQuery !== 'undefined') && window.jQuery

    // Turbo (Rails 7+)
    if (typeof Turbo !== 'undefined') {
      document.addEventListener('turbo:load', onMount)
      document.addEventListener('turbo:render', onMount)
      document.addEventListener('turbo:before-render', onUnmount)
    }
    // Turbolinks 5+
    else if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
      if (typeof Turbolinks.controller !== 'undefined') {
        document.addEventListener('turbolinks:load', onMount, { once: true })
        document.addEventListener('turbolinks:render', onMount)
        document.addEventListener('turbolinks:before-render', onUnmount)
      }
      // Turbolinks Classic
      else if (typeof Turbolinks.EVENTS !== 'undefined') {
        document.addEventListener(Turbolinks.EVENTS.CHANGE, onMount)
        document.addEventListener(Turbolinks.EVENTS.BEFORE_UNLOAD, onUnmount)
      }
    }
    // PJAX
    else if ($ && typeof $.pjax === 'function') {
      $(document).on('ready', onMount)
      $(document).on('pjax:end', onMount)
      $(document).on('pjax:beforeReplace', onUnmount)
    }
    // Standard DOM events
    else {
      if ($) {
        $(onMount)
      } else if ('addEventListener' in window) {
        document.addEventListener('DOMContentLoaded', onMount)
      } else {
        // IE8 support
        window.attachEvent('onload', onMount)
      }
    }
  }

  /**
   * Get all registered component names
   * @returns {string[]} Array of registered component names
   */
  getRegisteredComponents() {
    return Object.keys(this.registeredComponents)
  }

  /**
   * Check if a component is registered
   * @param {string} name - Component name to check
   * @returns {boolean} Whether the component is registered
   */
  isComponentRegistered(name) {
    return Object.prototype.hasOwnProperty.call(this.registeredComponents, name)
  }
}

// Create singleton instance
const playbookRenderer = new PlaybookRenderer()

// Make it globally available for debugging
if (typeof window !== 'undefined') {
  window.PlaybookRenderer = playbookRenderer
}

export default playbookRenderer
