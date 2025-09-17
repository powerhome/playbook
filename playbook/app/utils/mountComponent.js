// This is a component mounting script to replace Webpacker React mounting
import ComponentRegistry from './componentRegistry'

function mountComponents(root) {
  ComponentRegistry.mountComponents(root || document)
}
function unmountComponents() {
  ComponentRegistry.unmountComponents()
}

// Initial mount
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => mountComponents())
} else {
  mountComponents()
}

// Page-level mounts
document.addEventListener('turbo:load', () => mountComponents())
document.addEventListener('turbo:render', () => mountComponents())

// Only unmount page-wide on actual nav cache
document.addEventListener('turbo:before-cache', unmountComponents)

// Frame-level: unmount/mount just the affected frame
document.addEventListener(
  'turbo:before-frame-render',
  (e) => {
    ComponentRegistry.unmountWithin(e.target)
  },
  { capture: true }
)
document.addEventListener('turbo:frame-render', (e) => {
  mountComponents(e.target)
})

// Fallback for older Turbo where frame-load fires
document.addEventListener('turbo:frame-load', (e) => {
  mountComponents(e.target)
})

// Light observer to catch any late-added components
let mo
try {
  mo = new MutationObserver((muts) => {
    // If any PB mount points were added, schedule a mount pass
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (n.nodeType === 1) {
          const el = /** @type {Element} */ (n)
          if (
            el.matches?.('[data-pb-react-component]') ||
            el.querySelector?.('[data-pb-react-component]')
          ) {
            requestAnimationFrame(() => mountComponents(el.ownerDocument || document))
            return
          }
        }
      }
    }
  })
  mo.observe(document.documentElement, { childList: true, subtree: true })
} catch (_) {
  // no-op
}

export { mountComponents, unmountComponents }
