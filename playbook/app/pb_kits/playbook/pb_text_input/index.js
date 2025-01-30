import PbEnhancedElement from "../pb_enhanced_element";

export default class PbTextInput extends PbEnhancedElement {
  static get selector() {
    return '[data-pb-input-mask="true"]';
  }

  connect() {
    this.handleInput = this.handleInput.bind(this);
    this.element.addEventListener("input", this.handleInput);
  }

  disconnect() {
    this.element.removeEventListener("input", this.handleInput);
  }

  handleInput() {
    const maskType = this.element.getAttribute("mask");
    const cursorPosition = this.element.selectionStart;
    const rawValue = this.element.value;
    let formattedValue = rawValue;

    switch (maskType) {
      case "currency":
        formattedValue = formatCurrency(rawValue);
        break;
      case "ssn":
        formattedValue = formatSSN(rawValue);
        break;
      case "postal_code":
        formattedValue = formatPostalCode(rawValue);
        break;
      case "zip_code":
        formattedValue = formatZipCode(rawValue);
        break;
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

function formatCurrency(value) {
  const numericValue = value.replace(/[^0-9]/g, "").slice(0, 15);
  if (!numericValue) return "";
  const dollars = parseFloat((parseInt(numericValue) / 100).toFixed(2));
  if (dollars === 0) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(dollars);
}

function formatSSN(value) {
  const cleaned = value.replace(/\D/g, "").slice(0, 9);
  return cleaned
    .replace(/(\d{5})(?=\d)/, "$1-")
    .replace(/(\d{3})(?=\d)/, "$1-");
}

function formatZipCode(value) {
  return value.replace(/\D/g, "").slice(0, 5);
}

function formatPostalCode(value) {
  const cleaned = value.replace(/\D/g, "").slice(0, 9);
  return cleaned.replace(/(\d{5})(?=\d)/, "$1-");
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
