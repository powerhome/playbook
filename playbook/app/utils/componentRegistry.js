// This is a custom component registry to replace Webpacker React
// NOTE: When we go to React 18, we will need to update this to use createRoot instead of render.
// Namespaced to Playbook's data-pb-react-* attributes to avoid conflicts with other React usage on the page.
import React from 'react'
import ReactDOM from 'react-dom'

class ComponentRegistry {
  constructor() {
    this.components = new Map()
    this.mountedComponents = new Set()
    this._mountQueue = new WeakMap()
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
mountComponents(root = document) {
    const nodes = root.querySelectorAll('[data-pb-react-component]')
    nodes.forEach((el) => {
      if (this.mountedComponents.has(el)) return

      const name = el.getAttribute('data-pb-react-component')
      if (!name) return

      const Comp = this.get(name)
      if (!Comp) return
      this._scheduleMount(el, Comp)
    })
  }

  _scheduleMount(el, Comp, immediate = false) {
    let entry = this._mountQueue.get(el)
    if (!entry) {
      entry = { scheduled: false, retries: 0 }
      this._mountQueue.set(el, entry)
    }
    if (entry.scheduled && !immediate) return

    const run = () => {
      entry.scheduled = false
      this._tryRender(el, Comp, entry)
    }

    entry.scheduled = true
    if (immediate) {
      run()
    } else {
      requestAnimationFrame(run)
    }
  }

  _tryRender(el, Comp, entry) {
    if (!el.isConnected) return
    try {
      const props = this.extractProps(el)
      ReactDOM.render(React.createElement(Comp, props), el)
      this.mountedComponents.add(el)
      entry.retries = 0
    } catch (err) {
      // Soft-handle DOM races (e.g., NotFoundError during Turbo swaps)
      entry.retries = (entry.retries || 0) + 1
      if (entry.retries <= 3) {
        // retry next frame
        this._scheduleMount(el, Comp, false)
      } else {
        // eslint-disable-next-line no-console
        console.warn('[PB] Mount failed after retries:', err)
      }
    }
  }

  unmountComponents() {
    this.mountedComponents.forEach((el) => {
      this._safeUnmount(el)
    })
    this.mountedComponents.clear()
  }

  // Unmount only components contained within a given root element
  unmountWithin(rootEl) {
    if (!rootEl) return
    const toUnmount = []
    this.mountedComponents.forEach((el) => {
      if (rootEl.contains(el)) toUnmount.push(el)
    })
    toUnmount.forEach((el) => this._safeUnmount(el))
  }

  _safeUnmount(el) {
    if (!el || !el.isConnected) {
      this.mountedComponents.delete(el)
      return
    }
    try {
      ReactDOM.unmountComponentAtNode(el)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[PB] Unmount warning:', err)
    }
    this.mountedComponents.delete(el)
  }

  extractProps(el) {
    const props = {}
    const blob = el.getAttribute('data-pb-react-props')
    if (blob) {
      try { Object.assign(props, JSON.parse(blob)) }
      catch (e) { console.warn('[PB] Failed to parse data-pb-react-props JSON:', e) }
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
