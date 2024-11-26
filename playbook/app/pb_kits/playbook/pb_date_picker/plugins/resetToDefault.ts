import PbEnhancedElement from "../../pb_enhanced_element"
const DATE_PICKER_WRAPPER_SELECTOR = "[data-pb-date-picker]"
const DATE_PICKER_DATA_SELECTOR = "[data-pb-date-picker-input]"

export default class PbDatePicker extends PbEnhancedElement {
    static get selector() {
      return DATE_PICKER_WRAPPER_SELECTOR;
    }
  
    connect() {
      this.handleFormReset()
    
    }
    handleFormReset() {
      console.log("hello")
        const form = this.element.closest("form")
        if (form) {
          form.addEventListener("reset", () => {
            this.element.querySelector(DATE_PICKER_DATA_SELECTOR)?.setAttribute("value","11/13/1997")
           
          })
        }
      }
  
  }
  