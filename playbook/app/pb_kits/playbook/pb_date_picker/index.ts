import PbEnhancedElement from "../pb_enhanced_element";
import flatpickr from "flatpickr"; // Import flatpickr if used

const DATE_PICKER_WRAPPER_SELECTOR = '[data-pb-date-picker]';
const SELECT_VALIDATION_MESSAGE_CLASS = '.pb_body_kit_negative';

export default class PbDatePicker extends PbEnhancedElement {
  static get selector() {
    return DATE_PICKER_WRAPPER_SELECTOR;
  }

  connect() {
    this.setValidationMessage();
  }

  setValidationMessage() {
    const validationMessage = this.element.dataset?.validationMessage;
    const inputElement = this.element.querySelector("input");

    if (inputElement) {
      flatpickr(inputElement, {
        onReady: () => {
          inputElement.removeAttribute('readonly');
        },
      });

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'readonly') {
            inputElement.removeAttribute('readonly');
          }
        }
      });

      observer.observe(inputElement, {
        attributes: true,
      });
    }

    if (validationMessage) {
      const setErrorTextContent = (text, timeout) => {
        setTimeout(() => {
          const errorMessageElement = this.element.querySelector(SELECT_VALIDATION_MESSAGE_CLASS);
          console.log("errorMessageElement " + errorMessageElement)
          if (errorMessageElement) {
            errorMessageElement.textContent = text;
          } else {
            setErrorTextContent(text, 100);
          }
        }, timeout);
      };

      inputElement.addEventListener("change", (e) => {
        if (!e.target.checkValidity()) {
          console.log("hello")
          setErrorTextContent(validationMessage, 300);
        }
      });
    }
  }
}