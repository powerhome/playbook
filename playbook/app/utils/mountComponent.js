// This is a component mounting script to replace Webpacker React mounting
import ComponentRegistry from './componentRegistry'

// Function to mount components when DOM is ready
function mountComponents() {
  ComponentRegistry.mountComponents()
}
function unmountComponents() {
  ComponentRegistry.unmountComponents()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountComponents)
} else {
  mountComponents()
}

document.addEventListener('turbo:load', mountComponents)
document.addEventListener('turbo:render', mountComponents)

document.addEventListener('turbo:before-cache', unmountComponents)

document.addEventListener(
  'turbo:before-frame-render',
  (e) => {
    if (ComponentRegistry.unmountWithin) {
      ComponentRegistry.unmountWithin(e.target)
    }
  },
  { capture: true }
)
document.addEventListener('turbo:frame-render', mountComponents)

document.addEventListener('page:load', mountComponents)

export { mountComponents, unmountComponents }