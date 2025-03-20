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
    this.observeHiddenInputs();
    this.observeRogueErrorInsideInnerContainer();
  }

  addEventListeners() {
    const inputElement = this.element.querySelector("input");

    inputElement.addEventListener("invalid", () => {
      this.handleErrorLabel(300);
    });
    inputElement.addEventListener("blur", () => {
      this.justBlurred = true;

      setTimeout(() => {
        this.justBlurred = false;
      }, 300);
    });
  }

  handleErrorLabel(delay) {
    setTimeout(() => {
      const errorLabelElement = this.target;
      const wrapper = this.element.querySelector(".wrapper");

      if (errorLabelElement) {
        errorLabelElement.remove();
        if (wrapper) {
          if (wrapper.querySelector(".pb_body_kit_negative")) {
            wrapper.querySelector(".pb_body_kit_negative").remove();
          }
          wrapper.appendChild(errorLabelElement);
        }
        this.element.classList.add("error");
      } else {
        this.handleErrorLabel(100);
      }
    }, delay);
  }

  observeHiddenInputs() {
    const container = this.element.querySelector(".input_inner_container");
    if (!container) return;

    this.mutationObserver = new MutationObserver(() => {
      const hiddenInputs = container.querySelectorAll('input[type="hidden"]');
      if (hiddenInputs.length > 0) {
        // At least one hidden input exists, so clear the error
        this.clearError();
      }
    });

    this.mutationObserver.observe(container, {
      childList: true,
    });
  }

  observeRogueErrorInsideInnerContainer() {
    const container = this.element.querySelector(".input_inner_container");

    this.rogueErrorObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.classList.contains("pb_body_kit_negative")
          ) {
            if (this.justBlurred) {
              node.remove();
            }
          }
        }
      }
    });

    this.rogueErrorObserver.observe(container, {
      childList: true,
      subtree: true,
    });
  }

  clearError(e) {
    const errorLabelElement = this.target;

    if (errorLabelElement) {
      errorLabelElement.remove();
      this.element.classList.remove("error");
      this.element.querySelector("input").value = e.detail.value;
    }
  }
}
