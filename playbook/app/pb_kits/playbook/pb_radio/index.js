import PbEnhancedElement from "../pb_enhanced_element"

const RADIO_SELECTOR = "[data-pb-radio-children]"
const RADIO_WRAPPER_SELECTOR = "[data-pb-radio-children-wrapper]"

export default class PbRadio extends PbEnhancedElement {
  static get selector() {
    return RADIO_SELECTOR
  }

  connect() {
    const radioWrapperElement = this.element.parentElement.querySelector(RADIO_WRAPPER_SELECTOR)
    radioWrapperElement.addEventListener("click", () => {
      this.element.querySelector("input[type='radio']").click()
    })
  }
}
