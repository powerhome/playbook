export default class PbTextInput {
  static start() {
    const inputElements = document.querySelectorAll('[data-pb-input-mask="true"]');

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (event) => {
        const maskType = inputElement.getAttribute("mask");
        const cursorPosition = inputElement.selectionStart;

        let rawValue = event.target.value;
        let formattedValue = rawValue;

        // Apply formatting based on the mask type
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

        // Update the sanitized input field in the same wrapper
        const sanitizedInput = inputElement
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

        inputElement.value = formattedValue;
        setCursorPosition(inputElement, cursorPosition, rawValue, formattedValue);
      });
    });

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

// function to set cursor position
function setCursorPosition(inputElement, cursorPosition, rawValue, formattedValue) {
  const difference = formattedValue.length - rawValue.length;

  const newPosition = Math.max(0, cursorPosition + difference);

  requestAnimationFrame(() => {
    inputElement.setSelectionRange(newPosition, newPosition);
  });
}
