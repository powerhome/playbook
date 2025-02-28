import PbEnhancedElement from "../pb_enhanced_element";

const SELECT_WRAPPER_SELECTOR = "[data-pb-select]";
const SELECT_VALIDATION_MESSAGE_CLASS = ".pb_body_kit_negative";

export default class PbSelect extends PbEnhancedElement {
  static get selector() {
    return SELECT_WRAPPER_SELECTOR;
  }

  connect() {
    this.setValidationMessage();
  }

  setValidationMessage() {
    const validationMessage = this.element.dataset?.validationMessage;

    if (validationMessage) {
      const selectElement = this.element.querySelector("select");
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

      selectElement.addEventListener("change", (e) => {
        if (!e.target.checkValidity()) {
          setErrorTextContent(validationMessage, 300);
        }
      });
    }
  }
}
