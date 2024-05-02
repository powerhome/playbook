import PbEnhancedElement from '../pb_enhanced_element'

const DROPDOWN_SELECTOR = '[data-pb-dropdown]'
const TRIGGER_SELECTOR = '[data-dropdown-trigger]'
const CONTAINER_SELECTOR = '[data-dropdown-container]'
const DOWN_ARROW_SELECTOR = '#dropdown_open_icon'
const UP_ARROW_SELECTOR = '#dropdown_close_icon'
const OPTION_SELECTOR = '[data-dropdown-option-label]'
const CUSTOM_DISPLAY_SELECTOR = '[data-dropdown-custom-trigger]'


// Keyboard accessibility
class PbDropdownKeyboard {
  constructor(dropdown) {
      this.dropdown = dropdown;
      this.dropdownElement = dropdown.element;
      this.options = Array.from(this.dropdownElement.querySelectorAll(OPTION_SELECTOR));
      this.focusedOptionIndex = -1;
      this.init();
  }

  init() {
      this.dropdownElement.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
      switch (event.key) {
          case 'ArrowDown':
              event.preventDefault();
              if (!this.dropdown.target.classList.contains('open')) {
                this.dropdown.showElement(this.dropdown.target);
                this.dropdown.displayUpArrow();
            }
              this.moveFocus(1);
              break;
          case 'ArrowUp':
              event.preventDefault();
              this.moveFocus(-1);
              break;
          case 'Enter':
            event.preventDefault();
            if (this.focusedOptionIndex !== -1) {
                this.selectOption();
            } else {
                if (!this.dropdown.target.classList.contains('open')) {
                    this.dropdown.showElement(this.dropdown.target);
                    this.dropdown.displayUpArrow();
                }
            }
            break;
          case 'Escape':
              this.dropdown.hideElement(this.dropdown.target);
              break;
              case 'Tab':
                this.dropdown.hideElement(this.dropdown.target);
                this.dropdown.displayDownArrow();
                this.resetFocus();
                break;
          default:
              break;
      }
  }

  moveFocus(direction) {
      if (this.focusedOptionIndex !== -1) {
          this.options[this.focusedOptionIndex].classList.remove('pb_dropdown_option_focused');
      }
      this.focusedOptionIndex = (this.focusedOptionIndex + direction + this.options.length) % this.options.length;
      this.options[this.focusedOptionIndex].classList.add('pb_dropdown_option_focused');
  }

  selectOption() {
      const option = this.options[this.focusedOptionIndex];
      this.dropdown.onOptionSelected(option.dataset.dropdownOptionLabel, option);
      this.dropdown.hideElement(this.dropdown.target);
  }
}

export default class PbDropdown extends PbEnhancedElement {
  static get selector() {
    return DROPDOWN_SELECTOR
  }

  connect() {
    this.keyboardHandler = new PbDropdownKeyboard(this);
    const customTrigger = this.element.querySelector(CUSTOM_DISPLAY_SELECTOR)
    if (!customTrigger) {
    this.element.addEventListener('click', () => {
      this.toggleElement(this.target)
    })
  } else {  
    customTrigger.addEventListener('click', () => {
      this.toggleElement(this.target)
    } )
  }

    this.target.addEventListener('click', this.handleOptionClick.bind(this))
    document.addEventListener('click', this.handleDocumentClick.bind(this), true);
    this.displayDownArrow()
  }

  handleOptionClick(event) {
    const option = event.target.closest(OPTION_SELECTOR);
    if (option) {
      const value = option.dataset.dropdownOptionLabel;
      this.onOptionSelected(value, option);
    }
  }

  handleDocumentClick(event) {
    if (this.isClickOutside(event) && this.target.classList.contains('open')) {
        this.hideElement(this.target);
        this.displayDownArrow();
    }
}

isClickOutside(event) {
  const customTrigger = this.element.querySelector(CUSTOM_DISPLAY_SELECTOR);
  if (customTrigger) {
      return !customTrigger.contains(event.target);
  } else {
      const triggerElement = this.element.querySelector(TRIGGER_SELECTOR);
      const containerElement = this.element.parentNode.querySelector(CONTAINER_SELECTOR);

      const isOutsideTrigger = triggerElement ? !triggerElement.contains(event.target) : true;
      const isOutsideContainer = containerElement ? !containerElement.contains(event.target) : true;

      return isOutsideTrigger && isOutsideContainer;
  }
}

  onOptionSelected(value, selectedOption) {
    const triggerElement = this.element.querySelector('#dropdown_trigger_display');
    const customDisplayElement = this.element.querySelector('#dropdown_trigger_custom_display');
    if (triggerElement) {
      const selectedLabel = JSON.parse(value).label;
      triggerElement.textContent = selectedLabel;
      if (customDisplayElement) {
        customDisplayElement.style.display = 'block';
        customDisplayElement.style.paddingRight = '8px';
    }
    }

    const customTrigger = this.element.querySelector(CUSTOM_DISPLAY_SELECTOR)
    if (customTrigger) {
        if (this.target.classList.contains('open')) {
          this.hideElement(this.target)
          this.displayDownArrow()
        }
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
    elem.classList.remove('close');
    elem.classList.add('open');
    elem.style.height = elem.scrollHeight + 'px';
  }

  hideElement(elem) {
    elem.style.height = elem.scrollHeight + 'px';
    window.setTimeout(() => {
      elem.classList.add('close');
      elem.classList.remove('open');
      this.resetFocus();
    }, 0);
  }

  resetFocus() {
    if (this.keyboardHandler) {
        this.keyboardHandler.focusedOptionIndex = -1;
        const options = this.element.querySelectorAll(OPTION_SELECTOR);
        options.forEach(option => option.classList.remove('pb_dropdown_option_focused'));
    }
}

  toggleElement(elem) {
    if (elem.classList.contains('open')) {
      this.hideElement(elem)
      this.displayDownArrow()
      return
    }
    this.showElement(elem)
    this.displayUpArrow()
  }

  displayDownArrow() {
    this.updateArrowDisplay(false);
  }

  displayUpArrow() {
    this.updateArrowDisplay(true);
  }

  updateArrowDisplay(isOpen) {
    const downArrow = this.element.querySelector(DOWN_ARROW_SELECTOR);
    const upArrow = this.element.querySelector(UP_ARROW_SELECTOR);
    if (downArrow && upArrow) {
      downArrow.style.display = isOpen ? 'none' : 'inline-block';
      upArrow.style.display = isOpen ? 'inline-block' : 'none';
    }
  }
}
