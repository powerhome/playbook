import PbEnhancedElement from "../pb_enhanced_element"
import { INPUTMASKS } from "./inputMask"
import { stripEmojisForPaste, applyEmojiMask } from "../utilities/emojiMask"

export default class PbTextInput extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-input-mask="true"], [data-pb-emoji-mask="true"]';
  }

  connect() {
    this.handleInput = this.handleInput.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.element.addEventListener("input", this.handleInput);
    this.element.addEventListener("paste", this.handlePaste);
    this.handleInput(); 
  }

  disconnect() {
    this.element.removeEventListener("input", this.handleInput);
    this.element.removeEventListener("paste", this.handlePaste);
  }

  hasEmojiMask() {
    return this.element.dataset.pbEmojiMask === "true";
  }

  handlePaste(event) {
    if (!this.hasEmojiMask()) return;

    const pastedText = event.clipboardData.getData('text');
    const filteredText = stripEmojisForPaste(pastedText);

    if (pastedText !== filteredText) {
      event.preventDefault();
      const input = this.element;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const currentValue = input.value;
      const newValue = currentValue.slice(0, start) + filteredText + currentValue.slice(end);
      const newCursor = start + filteredText.length;
      
      input.value = newValue;
      input.selectionStart = input.selectionEnd = newCursor;
      
      // Continue to handleInput for mask processing, emoji filtering handled above
      this.handleInput({ skipEmojiFilter: true });
    }
  }

  handleInput({ skipEmojiFilter = false } = {}) {
    const cursorPosition = this.element.selectionStart;
    let baseValue = this.element.value;

    // Apply emoji mask if enabled (skip if already filtered in paste handler)
    if (this.hasEmojiMask() && !skipEmojiFilter) {
      const result = applyEmojiMask(this.element);
      baseValue = result.value;
    }

    const maskType = this.element.getAttribute("mask");
    let formattedValue = baseValue;

    const maskKey = {
      currency: 'currency',
      ssn: 'ssn',
      postal_code: 'postalCode',
      zip_code: 'zipCode',
      credit_card: 'creditCard',
      cvv: 'cvv',
    }[maskType];

    if (maskKey && INPUTMASKS[maskKey]) {
      formattedValue = INPUTMASKS[maskKey].format(baseValue);
    }

    const sanitizedInput = this.element
      .closest(".text_input_wrapper")
      ?.querySelector('[data="sanitized-pb-input"]');

    // Ensure sanitized input uses the already filtered value
    if (sanitizedInput) {
      switch (maskType) {
        case "ssn":
          sanitizedInput.value = sanitizeSSN(formattedValue);
          break;
        case "currency":
          sanitizedInput.value = sanitizeCurrency(formattedValue);
          break;
        case "credit_card":
          sanitizedInput.value = sanitizeCreditCard(formattedValue);
          break;
        default:
          sanitizedInput.value = formattedValue;
      }
    }

    if (maskType) {
      this.element.value = formattedValue;
      setCursorPosition(this.element, cursorPosition, baseValue, formattedValue);
    }
  }
}

function sanitizeSSN(input) {
  return input.replace(/\D/g, "");
}

function sanitizeCurrency(input) {
  return input.replace(/[$,]/g, "");
}

function sanitizeCreditCard(input) {
  return input.replace(/\D/g, ""); 
}

function setCursorPosition(inputElement, cursorPosition, rawValue, formattedValue) {
  const difference = formattedValue.length - rawValue.length;
  const newPosition = Math.max(0, cursorPosition + difference);
  requestAnimationFrame(() => {
    inputElement.setSelectionRange(newPosition, newPosition);
  });
}
