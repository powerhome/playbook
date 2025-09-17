// This is a custom component registry to replace Webpacker React
// NOTE: When we go to React 18, we will need to update this to use createRoot instead of render.
// Namespaced to Playbook's data-pb-react-* attributes to avoid conflicts with other React usage on the page.
import React from 'react'
import ReactDOM from 'react-dom'

class ComponentRegistry {
  constructor() {
    this.components = new Map()
    this.mountedComponents = new Set()
  }

  register(name, component) {
    this.components.set(name, component)
    const kebab = this.toKebabCase(name)
    if (kebab !== name) this.components.set(kebab, component)
  }

  registerComponents(components) {
    Object.entries(components).forEach(([name, comp]) => this.register(name, comp))
  }

  get(name) {
    return this.components.get(name)
  }

  // Mount all PB components on the page (skip turbo-permanent regions)
  mountComponents() {
    const nodes = document.querySelectorAll(
      '[data-pb-react-component]:not([data-turbo-permanent] [data-pb-react-component])'
    )

    nodes.forEach((el) => {
      if (this.mountedComponents.has(el)) return

      const name = el.getAttribute('data-pb-react-component')
      if (!name) return

      const Comp = this.get(name)
      if (!Comp) return

      this.mountComponent(el, Comp)
    })
  }

  // Mount a specific element
  mountComponent(el, Comp) {
    if (this.mountedComponents.has(el)) return
    try {
      const props = this.extractProps(el)
      ReactDOM.render(React.createElement(Comp, props), el)
      this.mountedComponents.add(el)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[PB] Failed to mount component:', err)
    }
  }

  // Unmount everything we mounted
  unmountComponents() {
    this.mountedComponents.forEach((el) => {
      if (!el.isConnected) return
      try {
        ReactDOM.unmountComponentAtNode(el)
      } catch (_) {
        /* ignore */
      }
    })
    this.mountedComponents.clear()
  }


  unmountWithin(rootEl) {
    if (!rootEl) return
    const toUnmount = []
    this.mountedComponents.forEach((el) => {
      if (rootEl.contains(el)) toUnmount.push(el)
    })
    toUnmount.forEach((el) => {
      try {
        if (el.isConnected) ReactDOM.unmountComponentAtNode(el)
      } catch (_) {
        /* ignore */
      }
      this.mountedComponents.delete(el)
    })
  }

  // Read props from data-pb-* attributes (JSON blob wins; individual attrs don’t override)
  extractProps(el) {
    const props = {}

    const blob = el.getAttribute('data-pb-react-props')
    if (blob) {
      try {
        Object.assign(props, JSON.parse(blob))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[PB] Failed to parse data-pb-react-props JSON:', e)
      }
    }

    Array.from(el.attributes).forEach((attr) => {
      const name = attr.name
      if (!name.startsWith('data-pb-')) return
      if (name === 'data-pb-react-component' || name === 'data-pb-react-props') return
      const key = name.replace('data-pb-', '')
      if (props[key] === undefined) props[key] = attr.value
    })

    return props
  }

  toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
      .replace(/([0-9])([a-zA-Z])/g, '$1-$2')
      .toLowerCase()
  }
}

window.ComponentRegistry = window.ComponentRegistry || new ComponentRegistry();

export default window.ComponentRegistry;