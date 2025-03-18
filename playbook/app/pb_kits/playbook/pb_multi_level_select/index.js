import PbEnhancedElement from "../pb_enhanced_element";

const MULTI_LEVEL_SELECT_SELECTOR = "[data-multi_level_select_form]";

export default class PbMultiLevelSelect extends PbEnhancedElement {
  static get selector() {
    return MULTI_LEVEL_SELECT_SELECTOR;
  }

  get target() {
    return this.element.querySelector(".pb_body_kit_negative");
  }

  connect() {
    this.addEventListeners();
  }

  addEventListeners() {
    const inputElement = this.element.querySelector("input");

    inputElement.addEventListener("invalid", () => {
      this.handleErrorLabel(200);
    });

    document.addEventListener("changemultilevelselect", (e) => {
      this.clearError(e);
    });
  }

  handleErrorLabel(delay) {
    setTimeout(() => {
      const errorLabelElement = this.target;

      if (errorLabelElement) {
        errorLabelElement.remove();
        this.element.querySelector(".wrapper").appendChild(errorLabelElement);
        this.element.querySelector(".input_wrapper").classList.add("error");
      } else {
        this.handleErrorLabel(100);
      }
    }, delay);
  }

  clearError(e) {
    const errorLabelElement = this.target;

    if (errorLabelElement) {
      errorLabelElement.remove();
      this.element.querySelector(".input_wrapper").classList.remove("error");
      this.element.querySelector("input").value = e.detail.value;
    }
  }
}
