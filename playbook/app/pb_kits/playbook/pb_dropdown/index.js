import PbEnhancedElement from "../pb_enhanced_element";
import { PbDropdownKeyboard } from "./keyboard_accessibility";

const DROPDOWN_SELECTOR = "[data-pb-dropdown]";
const TRIGGER_SELECTOR = "[data-dropdown-trigger]";
const CONTAINER_SELECTOR = "[data-dropdown-container]";
const DOWN_ARROW_SELECTOR = "#dropdown_open_icon";
const UP_ARROW_SELECTOR = "#dropdown_close_icon";
const OPTION_SELECTOR = "[data-dropdown-option-label]";
const CUSTOM_DISPLAY_SELECTOR = "[data-dropdown-custom-trigger]";
const INPUT_FORM_VALIDATION = "#dropdown-form-validation";

export default class PbDropdown extends PbEnhancedElement {
  static get selector() {
    return DROPDOWN_SELECTOR;
  }

  get target() {
    return this.element.parentNode.querySelector(CONTAINER_SELECTOR);
  }

  connect() {
    this.keyboardHandler = new PbDropdownKeyboard(this);
    this.bindEventListeners();
    this.updateArrowDisplay(false);
    this.handleFormValidation();
  }

  bindEventListeners() {
    const customTrigger =
      this.element.querySelector(CUSTOM_DISPLAY_SELECTOR) || this.element;
    customTrigger.addEventListener("click", () =>
      this.toggleElement(this.target)
    );

    this.target.addEventListener("click", this.handleOptionClick.bind(this));
    document.addEventListener(
      "click",
      this.handleDocumentClick.bind(this),
      true
    );
  }

  handleOptionClick(event) {
    const option = event.target.closest(OPTION_SELECTOR);
    const hiddenInput = this.element.querySelector("#dropdown-selected-option");
    const inputFormValidation = this.element.querySelector(INPUT_FORM_VALIDATION);

    if (option) {
      const value = option.dataset.dropdownOptionLabel;
      hiddenInput.value = JSON.parse(value).id;
      inputFormValidation.value = JSON.parse(value).id;
      this.clearFormValidation(inputFormValidation);
      this.onOptionSelected(value, option);
    }
  }

  handleDocumentClick(event) {
    if (this.isClickOutside(event) && this.target.classList.contains("open")) {
      this.hideElement(this.target);
      this.updateArrowDisplay(false);
    }
  }

  isClickOutside(event) {
    const customTrigger = this.element.querySelector(CUSTOM_DISPLAY_SELECTOR);
    if (customTrigger) {
      return !customTrigger.contains(event.target);
    } else {
      const triggerElement = this.element.querySelector(TRIGGER_SELECTOR);
      const containerElement =
        this.element.parentNode.querySelector(CONTAINER_SELECTOR);

      const isOutsideTrigger = triggerElement
        ? !triggerElement.contains(event.target)
        : true;
      const isOutsideContainer = containerElement
        ? !containerElement.contains(event.target)
        : true;

      return isOutsideTrigger && isOutsideContainer;
    }
  }

  onOptionSelected(value, selectedOption) {
    const triggerElement = this.element.querySelector(
      "#dropdown_trigger_display"
    );
    const customDisplayElement = this.element.querySelector(
      "#dropdown_trigger_custom_display"
    );
    if (triggerElement) {
      const selectedLabel = JSON.parse(value).label;
      triggerElement.textContent = selectedLabel;
      if (customDisplayElement) {
        customDisplayElement.style.display = "block";
        customDisplayElement.style.paddingRight = "8px";
      }
    }

    const customTrigger = this.element.querySelector(CUSTOM_DISPLAY_SELECTOR);
    if (customTrigger) {
      if (this.target.classList.contains("open")) {
        this.hideElement(this.target);
        this.updateArrowDisplay(false);
      }
    }

    const options = this.element.querySelectorAll(OPTION_SELECTOR);
    options.forEach((option) => {
      option.classList.remove("pb_dropdown_option_selected");
    });
    selectedOption.classList.add("pb_dropdown_option_selected");
  }

  showElement(elem) {
    elem.classList.remove("close");
    elem.classList.add("open");
    elem.style.height = elem.scrollHeight + "px";
  }

  hideElement(elem) {
    elem.style.height = elem.scrollHeight + "px";
    window.setTimeout(() => {
      elem.classList.add("close");
      elem.classList.remove("open");
      this.resetFocus();
    }, 0);
  }

  resetFocus() {
    if (this.keyboardHandler) {
      this.keyboardHandler.focusedOptionIndex = -1;
      const options = this.element.querySelectorAll(OPTION_SELECTOR);
      options.forEach((option) =>
        option.classList.remove("pb_dropdown_option_focused")
      );
    }
  }

  toggleElement(elem) {
    if (elem.classList.contains("open")) {
      this.hideElement(elem);
      this.updateArrowDisplay(false);
      return;
    }
    this.showElement(elem);
    this.updateArrowDisplay(true);
  }

  updateArrowDisplay(isOpen) {
    const downArrow = this.element.querySelector(DOWN_ARROW_SELECTOR);
    const upArrow = this.element.querySelector(UP_ARROW_SELECTOR);
    if (downArrow && upArrow) {
      downArrow.style.display = isOpen ? "none" : "inline-block";
      upArrow.style.display = isOpen ? "inline-block" : "none";
    }
  }

  handleFormValidation() {
    const inputFormValidation = this.element.querySelector(INPUT_FORM_VALIDATION);

    inputFormValidation.addEventListener("invalid", function (event) {
      if (inputFormValidation.hasAttribute("required") && inputFormValidation.value === "") {
        event.preventDefault();
        inputFormValidation.closest(".dropdown_wrapper").classList.add("error");
      }
    }, true);
  }

  clearFormValidation(input) {
    if (input.checkValidity()) {
      const dropdownWrapperElement = input.closest(".dropdown_wrapper");
      dropdownWrapperElement.classList.remove("error");

      const errorLabelElement = dropdownWrapperElement.querySelector(".pb_body_kit_negative");
      if (errorLabelElement) {
        errorLabelElement.remove();
      }
    }
  }
}
