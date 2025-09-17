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
    this.justBlurred = false;
    this.addEventListeners();
    this.observeHiddenInputs();
    this.observeRogueErrorInsideInnerContainer();
  }

  disconnect() {
    if (this.inputElement && this.onInvalid) {
      this.inputElement.removeEventListener("invalid", this.onInvalid);
    }
    if (this.inputElement && this.onBlur) {
      this.inputElement.removeEventListener("blur", this.onBlur);
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    if (this.rogueErrorObserver) {
      this.rogueErrorObserver.disconnect();
    }
  }

  addEventListeners() {
    const inputElement = this.element.querySelector("input");
    if (!inputElement) return;

    this.inputElement = inputElement;

    this.onInvalid = () => {
      this.handleErrorLabel(300);
    };

    this.onBlur = () => {
      this.justBlurred = true;
      setTimeout(() => {
        this.justBlurred = false;
      }, 300);
    };

    inputElement.addEventListener("invalid", this.onInvalid);
    inputElement.addEventListener("blur", this.onBlur);
  }

  handleErrorLabel(delay) {
    setTimeout(() => {
      const errorLabelElement = this.target;
      const wrapper = this.element.querySelector(".wrapper");

      if (errorLabelElement && wrapper) {
        this.element.classList.add("error");
        if (!wrapper.querySelector("[data-pb-error-clone]")) {
          const clone = errorLabelElement.cloneNode(true);
          clone.setAttribute("data-pb-error-clone", "true");
          wrapper.appendChild(clone);
        }
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
        this.clearError();
      }
    });

    this.mutationObserver.observe(container, {
      childList: true,
    });
  }

  observeRogueErrorInsideInnerContainer() {
    const container = this.element.querySelector(".input_inner_container");
    if (!container) return;

    this.rogueErrorObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.classList.contains("pb_body_kit_negative")
          ) {
            if (this.justBlurred && node.hasAttribute("data-pb-error-clone")) {
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
    const wrapper = this.element.querySelector(".wrapper");
    if (wrapper) {
      wrapper.querySelectorAll("[data-pb-error-clone]").forEach((n) => n.remove());
    }
    this.element.classList.remove("error");

    const input = this.element.querySelector("input");
    const newVal = e && e.detail ? e.detail.value : undefined;
    if (input && newVal != null) {
      input.value = newVal;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
}
