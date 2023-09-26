import PbEnhancedElement from '../pb_enhanced_element'

const MAIN_SELECTOR = '[data-collapsible-main]'
const CONTENT_SELECTOR = '[data-collapsible-content]'
const DOWN_ARROW_SELECTOR = '#collapsible_open_icon'
const UP_ARROW_SELECTOR = '#collapsible_close_icon'

export default class PbCollapsible extends PbEnhancedElement {
  static get selector() {
    return MAIN_SELECTOR
  }

  connect() {
    this.element.addEventListener('click', () => {
      this.toggleElement(this.target)
    })
    this.displayDownArrow()
  }

  get target() {
    return this.element.parentNode.querySelector(CONTENT_SELECTOR)
  }

  showElement(elem) {
  // Get the natural height of the element
    const getHeight = () => {
      elem.style.display = 'block'
      const height = elem.scrollHeight + 'px' // Get it's height
      elem.style.display = '' //  Hide it again
      return height
    }

    const height = getHeight()
    elem.classList.add('is-visible')
    elem.style.height = height // Update the max-height
    elem.style.overflow = "hidden"

    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(() => {
      elem.style.height = ''
      elem.style.overflow = "visible"
    }, 300)
  }

  hideElement(elem) {
    // Give the element a height to change from
    elem.style.height = elem.scrollHeight + 'px'

    window.setTimeout(() => {
      elem.style.height = '0'
      elem.style.paddingTop = '0'
      elem.style.paddingBottom = '0'
      elem.style.overflow = "hidden"
    }, 1)

    // When the transition is complete, hide it
    window.setTimeout(() => {
      elem.classList.remove('is-visible')
      elem.style.overflow = ""
    }, 300)
  }

  toggleElement(elem) {
    if (elem.classList.contains('is-visible')) {
      this.hideElement(elem)
      this.displayDownArrow()
      return
    }
    // Otherwise, show it
    this.showElement(elem)
    this.displayUpArrow()
  }

  displayDownArrow() {
    this.element.querySelector(DOWN_ARROW_SELECTOR).style.display = 'inline-block'
    this.element.querySelector(UP_ARROW_SELECTOR).style.display = 'none'
  }

  displayUpArrow() {
    this.element.querySelector(UP_ARROW_SELECTOR).style.display = 'inline-block'
    this.element.querySelector(DOWN_ARROW_SELECTOR).style.display = 'none'
   }
}
