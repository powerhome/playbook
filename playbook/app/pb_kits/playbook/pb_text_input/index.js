import PbEnhancedElement from "../pb_enhanced_element"
import { INPUTMASKS } from "./inputMask"

export default class PbTextInput extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-input-mask="true"]';
  }

  connect() {
    this.handleInput = this.handleInput.bind(this);
    this.element.addEventListener("input", this.handleInput);
    this.handleInput(); 
  }

  disconnect() {
    this.element.removeEventListener("input", this.handleInput);
  }

  handleInput() {
    const maskType = this.element.getAttribute("mask");
    const cursorPosition = this.element.selectionStart;
    const rawValue = this.element.value;
    let formattedValue = rawValue;

    const maskKey = {
      currency: 'currency',
      ssn: 'ssn',
      postal_code: 'postalCode',
      zip_code: 'zipCode',
    }[maskType];

    if (maskKey && INPUTMASKS[maskKey]) {
      formattedValue = INPUTMASKS[maskKey].format(rawValue);
    }

    const sanitizedInput = this.element
      .closest(".text_input_wrapper")
      ?.querySelector('[data="sanitized-pb-input"]');

    if (sanitizedInput) {
      switch (maskType) {
        case "ssn":
          sanitizedInput.value = sanitizeSSN(formattedValue);
          break;
        case "currency":
          sanitizedInput.value = sanitizeCurrency(formattedValue);
          break;
        default:
          sanitizedInput.value = formattedValue;
      }
    }

    this.element.value = formattedValue;
    setCursorPosition(this.element, cursorPosition, rawValue, formattedValue);
  }
}

function sanitizeSSN(input) {
  return input.replace(/\D/g, "");
}

function sanitizeCurrency(input) {
  return input.replace(/[$,]/g, "");
}

function setCursorPosition(inputElement, cursorPosition, rawValue, formattedValue) {
  const difference = formattedValue.length - rawValue.length;
  const newPosition = Math.max(0, cursorPosition + difference);
  requestAnimationFrame(() => {
    inputElement.setSelectionRange(newPosition, newPosition);
  });
}
