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

  getVisibleOptions() {
    // We only want to return the options that are visible
    return Array.from(
      this.dropdownElement.querySelectorAll(OPTION_SELECTOR)
    ).filter((opt) => opt.style.display !== "none");
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
    const allOptions = Array.from(
      this.dropdownElement.querySelectorAll(OPTION_SELECTOR)
    );
    const visible = this.getVisibleOptions();
    if (!visible.length) return;

    if (this.focusedOptionIndex !== -1) {
      allOptions[this.focusedOptionIndex].classList.remove(
        "pb_dropdown_option_focused"
      );
    }

    const prevVisibleIndex =
      this.focusedOptionIndex === -1
        ? -1
        : visible.indexOf(allOptions[this.focusedOptionIndex]);

    const nextVisibleIndex =
      (prevVisibleIndex + direction + visible.length) % visible.length;

    const nextEl = visible[nextVisibleIndex];
    nextEl.classList.add("pb_dropdown_option_focused");

    this.focusedOptionIndex = allOptions.indexOf(nextEl);
  }


  selectOption() {
    const allOptions = Array.from(
      this.dropdownElement.querySelectorAll(OPTION_SELECTOR)
    );
    if (this.focusedOptionIndex < 0) return;

    const optionEl = allOptions[this.focusedOptionIndex];
    this.dropdown.handleOptionClick({ target: optionEl });
    this.dropdown.toggleElement(this.dropdown.target);
    this.dropdown.updateClearButton();
  }
}
