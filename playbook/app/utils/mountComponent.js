// This is a component mounting script to replace Webpacker React mounting
// This covers turbo page loads, frame loads, and DOM changes
// Sister file exists in playbook-website. Any changes here should be reflected there.
import ComponentRegistry from './componentRegistry'

// Guard to prevent interaction with MultiLevelSelect components while an async Typeahead is loading
// This is to prevent MLS from disappearing on interaction due to the async Typeahead loading state
function installAsyncTypeaheadMlsInteractionGuard() {
  if (document.__asyncTypeaheadMlsInteractionGuardInstalled) {
    return
  }
  document.__asyncTypeaheadMlsInteractionGuardInstalled = true

  const typeaheadComponentSelector = '[data-pb-react-component="Typeahead"]'
  const loadingStateSelector = '.typeahead-kit-select__loading-indicator, .typeahead-kit-select__control--is-loading'
  const multiLevelSelectSelector = '[data-pb-react-component="MultiLevelSelect"], #location_select'
  const asyncTypeaheadEligibilityCache = new WeakMap()

  const isAsyncTypeaheadComponent = (typeaheadComponentNode) => {
    if (!typeaheadComponentNode) {
      return false
    }
    if (asyncTypeaheadEligibilityCache.has(typeaheadComponentNode)) {
      return asyncTypeaheadEligibilityCache.get(typeaheadComponentNode)
    }

    let isAsync = false
    const reactPropsJson = typeaheadComponentNode.getAttribute('data-pb-react-props')
    if (reactPropsJson) {
      try {
        const props = JSON.parse(reactPropsJson)
        isAsync = props?.async === true || props?.async === 'true'
      } catch (_) {
        isAsync = false
      }
    }

    asyncTypeaheadEligibilityCache.set(typeaheadComponentNode, isAsync)
    return isAsync
  }

  const hasLoadingAsyncTypeahead = () => {
    const typeaheadComponentNodes = document.querySelectorAll(typeaheadComponentSelector)
    for (const typeaheadComponentNode of typeaheadComponentNodes) {
      if (
        isAsyncTypeaheadComponent(typeaheadComponentNode) &&
        typeaheadComponentNode.querySelector(loadingStateSelector)
      ) {
        return true
      }
    }
    return false
  }

  const preventMlsInteractionWhileTypeaheadLoads = (event) => {
    if (!hasLoadingAsyncTypeahead()) {
      return
    }

    const mlsTargetNode = event.target.closest(multiLevelSelectSelector)
    if (!mlsTargetNode) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation()
    }
  }

  document.addEventListener('mousedown', preventMlsInteractionWhileTypeaheadLoads, true)
  document.addEventListener('click', preventMlsInteractionWhileTypeaheadLoads, true)
  document.addEventListener('touchstart', preventMlsInteractionWhileTypeaheadLoads, true)
}

function mountComponents(root) {
  ComponentRegistry.mountComponents(root || document)
}
function unmountComponents() {
  ComponentRegistry.unmountComponents()
}

// Initial mount
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    mountComponents()
    installAsyncTypeaheadMlsInteractionGuard()
  })
} else {
  mountComponents()
  installAsyncTypeaheadMlsInteractionGuard()
}

document.addEventListener('turbo:load', () => {
  mountComponents()
  installAsyncTypeaheadMlsInteractionGuard()
})
document.addEventListener('turbo:render', () => {
  mountComponents()
  installAsyncTypeaheadMlsInteractionGuard()
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
  installAsyncTypeaheadMlsInteractionGuard()
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
