import PbEnhancedElement from "../pb_enhanced_element";

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

    if (validationMessage) {
      const setErrorTextContent = (text, timeout) => {
        setTimeout(() => {
          const errorMessageElement = this.element.querySelector(SELECT_VALIDATION_MESSAGE_CLASS);
          if (errorMessageElement) {
            errorMessageElement.textContent = text;
          } else {
            setErrorTextContent(text, 100);
          }
        }, timeout);
      };

      inputElement.addEventListener("change", (e) => {
        if (!e.target.checkValidity()) {
          setErrorTextContent(validationMessage, 300);
        }
      });
    }
  }
}
