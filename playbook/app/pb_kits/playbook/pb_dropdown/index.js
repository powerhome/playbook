import PbEnhancedElement from '../pb_enhanced_element'

const DROPDOWN_SELECTOR = '[data-pb-dropdown]'
// const TRIGGER_SELECTOR = '[data-dropdown-trigger]'
const CONTAINER_SELECTOR = '[data-dropdown-container]'
const DOWN_ARROW_SELECTOR = '#dropdown_open_icon'
const UP_ARROW_SELECTOR = '#dropdown_close_icon'
const OPTION_SELECTOR = '[data-dropdown-option-label]'

export default class PbDropdown extends PbEnhancedElement {
  static get selector() {
    return DROPDOWN_SELECTOR
  }

  connect() {
    this.element.addEventListener('click', () => {
      this.toggleElement(this.target)
    })
    this.target.addEventListener('click', this.handleOptionClick.bind(this))
    this.displayDownArrow()
  }

  handleOptionClick(event) {
    const option = event.target.closest(OPTION_SELECTOR);
    if (option) {
      const value = option.dataset.dropdownOptionLabel;
      this.onOptionSelected(value, option);
    }
  }

  onOptionSelected(value, selectedOption) {
    const triggerElement = this.element.querySelector('#dropdown_trigger_display');
    if (triggerElement) {
      const selectedLabel = JSON.parse(value).label;
      triggerElement.textContent = selectedLabel;
    }

    const options = this.element.querySelectorAll(OPTION_SELECTOR);
    options.forEach(option => {
        option.classList.remove('pb_dropdown_option_selected');
    });
    selectedOption.classList.add('pb_dropdown_option_selected');

    console.log(`Selected value: ${value}`);
  }

  get target() {
    return this.element.parentNode.querySelector(CONTAINER_SELECTOR)
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
    elem.classList.add('open')
    elem.classList.remove('close')

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
    }, 0)

    // When the transition is complete, hide it
    window.setTimeout(() => {
      elem.classList.add("close")
      elem.classList.remove('open')
      elem.style.overflow = ""
    }, 0)
  }

  toggleElement(elem) {
    if (elem.classList.contains('open')) {
      this.hideElement(elem)
      this.displayDownArrow()
      return
    }
    // Otherwise, show it
    this.showElement(elem)
    this.displayUpArrow()
  }

  displayDownArrow() {
    const downArrow = this.element.querySelector(DOWN_ARROW_SELECTOR)
    const upArrow = this.element.querySelector(UP_ARROW_SELECTOR)
    if (!downArrow || !upArrow) {
      return
    }
    downArrow.style.display = 'inline-block'
    upArrow.style.display = 'none'
  }

  displayUpArrow() {
    const downArrow = this.element.querySelector(DOWN_ARROW_SELECTOR)
    const upArrow = this.element.querySelector(UP_ARROW_SELECTOR)
    if (!downArrow || !upArrow) {
      return
    }
    upArrow.style.display = 'inline-block'
    downArrow.style.display = 'none'
   }
}
