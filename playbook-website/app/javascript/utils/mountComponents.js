// Component mounting script to replace Webpacker React mounting
import ComponentRegistry from './componentRegistry'

// Function to mount components when DOM is ready
function mountComponents() {
  ComponentRegistry.mountComponents()
}

// Mount components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountComponents)
} else {
  mountComponents()
}

// Also mount components when Turbo navigates (for SPA-like behavior)
document.addEventListener('turbo:load', mountComponents)
document.addEventListener('turbo:render', mountComponents)

// For non-Turbo pages, also listen to page:load (if using Turbolinks)
document.addEventListener('page:load', mountComponents)

// Export for manual mounting if needed
export { mountComponents }
