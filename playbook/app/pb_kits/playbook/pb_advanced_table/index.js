import PbEnhancedElement from '../pb_enhanced_element'

const ADVANCED_TABLE_SELECTOR = '[data-advanced-table]'
const CONTENT_SELECTOR = '[data-advanced-table-content="id"]'
const DOWN_ARROW_SELECTOR = '#advanced-table_open_icon'
const UP_ARROW_SELECTOR = '#advanced-table_close_icon'

export default class PbAdvancedTable extends PbEnhancedElement {
  static get selector() {
    return ADVANCED_TABLE_SELECTOR
  }

  get target() {
    return document.querySelector(CONTENT_SELECTOR.replace("id", this.element.id))
  }

  connect() {
    this.element.addEventListener('click', () => {
      this.toggleElement(this.target)
    })
  }

  showElement(elem) {
    const getHeight = () => {
      elem.style.display = 'block'
      const height = elem.scrollHeight + 'px'
      elem.style.display = ''
      return height
    }

    const height = getHeight()
    elem.classList.add('is-visible')
    elem.style.height = height
    elem.style.overflow = "hidden"

    window.setTimeout(() => {
      elem.style.height = ''
      elem.style.overflow = "visible"
    }, 250)
  }

  hideElement(elem) {
    elem.style.height = elem.scrollHeight + 'px'

    window.setTimeout(() => {
      elem.style.height = '0'
      elem.style.paddingTop = '0'
      elem.style.paddingBottom = '0'
      elem.style.overflow = "hidden"
    }, 1)

    window.setTimeout(() => {
      elem.classList.remove('is-visible')
      elem.style.overflow = ""
    }, 200)
  }

  toggleElement(elem) {
    if (elem.classList.contains('is-visible')) {
      this.hideElement(elem)
      this.displayDownArrow()
      return
    }

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
