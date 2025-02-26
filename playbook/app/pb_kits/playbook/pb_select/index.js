import PbEnhancedElement from "../pb_enhanced_element";

const SELECT_WRAPPER_SELECTOR = "[data-pb-select]";
const SELECT_VALIDITY_MESSAGE_CLASS = ".pb_body_kit_negative";

export default class PbSelect extends PbEnhancedElement {
  static get selector() {
    return SELECT_WRAPPER_SELECTOR;
  }

  connect() {
    this.setValidityMessage();
  }

  setValidityMessage() {
    const validityMessage = this.element.dataset?.validityMessage;

    if (validityMessage) {
      const selectElement = this.element.querySelector("select");
      const setErrorTextContent = (text, timeout) => {
        setTimeout(() => {
          const errorMessageElement = this.element.querySelector(SELECT_VALIDITY_MESSAGE_CLASS);
          if (errorMessageElement) {
            errorMessageElement.textContent = text;
          } else {
            setErrorTextContent(text, 100);
          }
        }, timeout);
      };

      selectElement.addEventListener("change", (e) => {
        if (!e.target.checkValidity()) {
          setErrorTextContent(validityMessage, 300);
        }
      });
    }
  }
}
