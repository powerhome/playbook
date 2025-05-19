const OPTION_SELECTOR = "[data-dropdown-option-label]";
const SEARCH_INPUT_SELECTOR = "[data-dropdown-autocomplete]";

export class PbDropdownKeyboard {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.dropdownElement = dropdown.element;
    this.options = Array.from(
      this.dropdownElement.querySelectorAll(OPTION_SELECTOR)
    );
    this.focusedOptionIndex = -1;
    this.searchInput = this.dropdownElement.querySelector(
      SEARCH_INPUT_SELECTOR
    );
    this.init();
  }

  init() {
    this.dropdownElement.addEventListener(
      "keydown",
      this.handleKeyDown.bind(this)
    );
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () =>
        this.openDropdownIfClosed()
      );
    }
  }

  openDropdownIfClosed() {
    if (!this.dropdown.target.classList.contains("open")) {
      this.dropdown.showElement(this.dropdown.target);
      this.dropdown.updateArrowDisplay(true);
    }
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!this.dropdown.target.classList.contains("open")) {
          this.dropdown.showElement(this.dropdown.target);
          this.dropdown.updateArrowDisplay(true);
        }
        this.moveFocus(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        this.moveFocus(-1);
        break;
      case "Enter":
        event.preventDefault();
        if (this.focusedOptionIndex !== -1) {
          this.selectOption();
        } else {
          if (!this.dropdown.target.classList.contains("open")) {
            this.dropdown.showElement(this.dropdown.target);
            this.dropdown.updateArrowDisplay(true);
          }
        }
        break;
      case "Escape":
        this.dropdown.hideElement(this.dropdown.target);
        break;
      case "Tab":
        this.dropdown.hideElement(this.dropdown.target);
        this.dropdown.updateArrowDisplay(false);
        this.resetFocus();
        break;
      case "Backspace":
        if (this.searchInput) {
          setTimeout(() => {
            if (this.searchInput.value.trim() === "") {
              this.dropdown.handleBackspaceClear();
            }
          }, 0); 
        }
        break;
      default:
        break;
    }
  }

  moveFocus(direction) {
    if (this.focusedOptionIndex !== -1) {
      this.options[this.focusedOptionIndex].classList.remove(
        "pb_dropdown_option_focused"
      );
    }
    this.focusedOptionIndex =
      (this.focusedOptionIndex + direction + this.options.length) %
      this.options.length;
    this.options[this.focusedOptionIndex].classList.add(
      "pb_dropdown_option_focused"
    );
  }

  selectOption() {
    const option = this.options[this.focusedOptionIndex];
    this.dropdown.handleOptionClick({ target: option });
    this.dropdown.toggleElement(this.dropdown.target);
    this.dropdown.updateClearButton();
  }
}
