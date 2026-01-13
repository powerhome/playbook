import PbEnhancedElement from "../pb_enhanced_element";

const TIME_PICKER_SELECTOR = '[data-pb-time-picker]';
const VALIDATION_MESSAGE_CLASS = '.pb_body_kit_negative';

export default class PbTimePicker extends PbEnhancedElement {
  static get selector(): string {
    return TIME_PICKER_SELECTOR;
  }

  connect(): void {
    this.setValidationMessage();
  }

  setValidationMessage(): void {
    const element = this.element as HTMLElement;
    const validationMessage = element.dataset?.validationMessage;
    const inputElement = element.querySelector("input");

    if (validationMessage) {
      const setErrorTextContent = (text: string, timeout: number): void => {
        setTimeout(() => {
          const errorMessageElement = element.querySelector(VALIDATION_MESSAGE_CLASS);
          if (errorMessageElement) {
            errorMessageElement.textContent = text;
          } else {
            setErrorTextContent(text, 100);
          }
        }, timeout);
      };

      inputElement?.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        if (!target.checkValidity()) {
          setErrorTextContent(validationMessage, 300);
        }
      });
    }
  }
}
