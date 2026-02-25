// This is a component mounting script to replace Webpacker React mounting
// This covers turbo page loads, frame loads, and DOM changes to keep it in sync with the sister files in playbook-ui
// Sister file exists in playbook-ui. Any changes here should be reflected there.
import ComponentRegistry from './componentRegistry'

function mountComponents(root) {
  ComponentRegistry.mountComponents(root || document)
}
function unmountComponents() {
  ComponentRegistry.unmountComponents()
}

 // Block MultiLevelSelect interaction while any PB Typeahead is loading async options
// Requires Typeahead to set: data-pb-typeahead-loading="true" while loading
function installTypeaheadLoadingMlsGuard() {
  if (document.__pbTypeaheadLoadingMlsGuardInstalled) return
  document.__pbTypeaheadLoadingMlsGuardInstalled = true

  const MLS_SELECTOR =
    '.pb_multi_level_select_kit, [data-pb-react-component="MultiLevelSelect"]'
  const LOADING_SELECTOR = '[data-pb-typeahead-loading="true"]'

  let isLoading = false
  const recompute = () => {
    isLoading = !!document.querySelector(LOADING_SELECTOR)
  }

  // Initial compute
  recompute()

  // Keep updated (batched)
  let raf = null
  const schedule = () => {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = null
      recompute()
    })
  }

  let obs
  try {
    obs = new MutationObserver(() => schedule())
    obs.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-pb-typeahead-loading'],
    })
  } catch (_) {
    // no-op
  }

  const blockIfLoading = (event) => {
    if (!isLoading) return
    if (!(event.target instanceof Element)) return

    const mls = event.target.closest(MLS_SELECTOR)
    if (!mls) return

    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation?.()
  }

  // Capture phase so we block before PB handlers run
  document.addEventListener('pointerdown', blockIfLoading, true)
  document.addEventListener('click', blockIfLoading, true)
}

// Initial mount
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    mountComponents()
    installTypeaheadLoadingMlsGuard()
  })
} else {
  mountComponents()
  installTypeaheadLoadingMlsGuard()
}

document.addEventListener('turbo:load', () => {
  mountComponents()
  installTypeaheadLoadingMlsGuard()
})
document.addEventListener('turbo:render', () => {
  mountComponents()
  installTypeaheadLoadingMlsGuard()
})

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
  installTypeaheadLoadingMlsGuard()
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
          el.querySelector?.(
            '[data-pb-react-component]:not([data-pb-react-mounted="true"])'
          )

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
