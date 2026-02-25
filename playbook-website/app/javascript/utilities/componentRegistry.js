// This is a custom component registry to replace Webpacker React
// NOTE: When we go to React 18, we will need to update this to use createRoot instead of render.
// Namespaced to Playbook's data-pb-react-* attributes to avoid conflicts with other React usage on the page.
// Sister file exists in playbook-ui. Any changes here should be reflected there.

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

  // Mount PB components within a given root element (root itself + descendants).
  // This is intentionally scoped so callers (MutationObserver, Turbo frames) can mount only what changed.
  mountComponents(root = document) {
    if (!root) return

    const mountPoints = []

    // Include root itself if it's a mount point
    if (root.nodeType === 1 && root.matches?.('[data-pb-react-component]')) {
      mountPoints.push(root)
    }

    // Include descendants
    const nodes = root.querySelectorAll?.('[data-pb-react-component]')
    if (nodes && nodes.length) mountPoints.push(...nodes)

    mountPoints.forEach((el) => {
      // If marked mounted but registry lost track (edge case), allow re-mount by clearing marker.
      if (el.getAttribute('data-pb-react-mounted') === 'true' && !this.mountedComponents.has(el)) {
        el.removeAttribute('data-pb-react-mounted')
      }

      // Skip if already mounted
      if (this.mountedComponents.has(el)) return
      if (el.getAttribute('data-pb-react-mounted') === 'true') return

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
    if (!el || !el.isConnected) return

    try {
      const props = this.extractProps(el)
      ReactDOM.render(React.createElement(Comp, props), el)

      // Mark as mounted for observer + moved-node stability
      el.setAttribute('data-pb-react-mounted', 'true')

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
    if (!el) return

    try {
      // IMPORTANT:
      // Always attempt to unmount, even if the node is detached.
      // During DOM swaps the mount point can be disconnected skipping unmount leaks
      // effects/portals/listeners and causes intermittent breakage, especially when using Turbo
      ReactDOM.unmountComponentAtNode(el)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[PB] Unmount warning:', err)
    }

    // Clean marker + tracking regardless
    try { el.removeAttribute?.('data-pb-react-mounted') } catch (_) {
      // Ignore errors if element is already detached or invalid
    }
    this.mountedComponents.delete(el)
  }

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
