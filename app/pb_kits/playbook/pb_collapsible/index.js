import PbEnhancedElement from '../pb_enhanced_element'

const MAIN_SELECTOR = '[data-collapsible-main]'
const CONTENT_SELECTOR = '[data-collapsible-content]'

export default class PbCollapsible extends PbEnhancedElement {
  static get selector() {
    return MAIN_SELECTOR
  }

  connect() {
    this.element.addEventListener('click', () => {
      this.toggle(this.target)
    })
  }

  get target() {
    return this.element.parentNode.querySelector(CONTENT_SELECTOR)
  }

  // Show an element
  show(elem) {
  // Get the natural height of the element
    const getHeight = () => {
      elem.style.display = 'block' // Make it visible
      const height = elem.scrollHeight + 'px' // Get it's height
      elem.style.display = '' //  Hide it again
      return height
    }

    const height = getHeight() // Get the natural height
    elem.classList.add('is-visible') // Make the element visible
    elem.style.height = height // Update the max-height

    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(() => {
      elem.style.height = ''
    }, 500)
  }
  // Hide an element
  hide(elem) {
    // Give the element a height to change from
    elem.style.height = elem.scrollHeight + 'px'
    // Set the height back to 0
    window.setTimeout(() => {
      elem.style.height = '0'
      elem.style.paddingTop = '0'
      elem.style.paddingBottom = '0'
    }, 1)

    // When the transition is complete, hide it
    window.setTimeout(() => {
      elem.classList.remove('is-visible')
    }, 500)
  }

  // Toggle element visibility
  toggle(elem) {
    // If the element is visible, hide it
    if (elem.classList.contains('is-visible')) {
      this.hide(elem)
      return
    }
    // Otherwise, show it
    this.show(elem)
  }
}
