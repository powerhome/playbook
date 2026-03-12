import PbEnhancedElement from '../pb_enhanced_element'
import { getElementHeight, setArrowVisibility, toggleVisibility } from '../utilities/domHelpers'

const MAIN_SELECTOR = '[data-collapsible-main]'
const CONTENT_SELECTOR = '[data-collapsible-content]'
const DOWN_ARROW_SELECTOR = '#collapsible_open_icon'
const UP_ARROW_SELECTOR = '#collapsible_close_icon'

export default class PbCollapsible extends PbEnhancedElement {
  static get selector() {
    return MAIN_SELECTOR
  }

  connect() {
    this.clickHandler = () => {
      this.toggleElement(this.target)
    }
    this.element.addEventListener('click', this.clickHandler)
    
     // Check the initial state of the collapsible content and set the arrow accordingly
     if (this.target.classList.contains('is-visible')) {
      this.displayUpArrow()
    } else {
      this.displayDownArrow()
    }
    // Listen for a custom event to toggle the collapsible
    this.customEventHandler = () => {
      this.toggleElement(this.target)
    }
    document.addEventListener(`${this.target.id}`, this.customEventHandler)
  }

  disconnect() {
    if (this.clickHandler) {
      this.element.removeEventListener('click', this.clickHandler)
    }
    if (this.customEventHandler && this.target) {
      document.removeEventListener(`${this.target.id}`, this.customEventHandler)
    }
  }

  get target() {
    return this.element.parentNode.querySelector(CONTENT_SELECTOR)
  }

  showElement(elem) {
    const height = getElementHeight(elem)
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
    const isExpanded = toggleVisibility({
      isVisible: elem.classList.contains('is-visible'),
      onHide: () => this.hideElement(elem),
      onShow: () => this.showElement(elem),
    })

    isExpanded ? this.displayUpArrow() : this.displayDownArrow()
  }

  toggleArrows(showDownArrow) {
    setArrowVisibility({
      rootElement: this.element,
      downSelector: DOWN_ARROW_SELECTOR,
      upSelector: UP_ARROW_SELECTOR,
      showDownArrow,
    })
  }
  
  displayDownArrow() {
    this.toggleArrows(true);
  }
  
  displayUpArrow() {
    this.toggleArrows(false);
  }
}
