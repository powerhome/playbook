// This is a component mounting script to replace Webpacker React mounting
// This covers turbo page loads, frame loads, and DOM changes
// Sister file exists in playbook-website. Any changes here should be reflected there.
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

document.addEventListener('turbo:load', () => mountComponents())
document.addEventListener('turbo:render', () => mountComponents())

document.addEventListener('turbo:before-cache', unmountComponents)

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

document.addEventListener('turbo:frame-load', (e) => {
  mountComponents(e.target)
})

// Light observer to catch any late-added PB mount points
// Important: mounts only within the added subtree to avoid remount races caused by unrelated async DOM churn
let mo
try {
  mo = new MutationObserver((muts) => {
    // If any PB mount points were added, schedule a mount pass
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (n.nodeType !== 1) continue
        const el = /** @type {Element} */ (n)

        // Only respond if this subtree contains *unmounted* PB mount points.
        const hasNewPbMountPoint =
          el.matches?.('[data-pb-react-component]:not([data-pb-react-mounted="true"])') ||
          el.querySelector?.('[data-pb-react-component]:not([data-pb-react-mounted="true"])')

        if (!hasNewPbMountPoint) continue

        // Mount only within the newly-added subtree.
        requestAnimationFrame(() => mountComponents(el))
        return
      }
    }
  })
  mo.observe(document.documentElement, { childList: true, subtree: true })
} catch (_) {
  // no-op
}

export { mountComponents, unmountComponents }
