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
    // @ts-ignore
    console.log("[MLS ENHANCER] connect", this.element);
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
    // @ts-ignore
    console.log("[MLS ENHANCER] disconnect", this.element);
  }

  addEventListeners() {
    const inputElement = this.element.querySelector("input");
    if (!inputElement) {
      // @ts-ignore
      console.log("[MLS ENHANCER] no input found");
      return;
    }

    this.inputElement = inputElement;

    this.onInvalid = () => {
      // @ts-ignore
      console.log("[MLS ENHANCER] input invalid");
      this.handleErrorLabel(300);
    };

    this.onBlur = () => {
      this.justBlurred = true;
      // @ts-ignore
      console.log("[MLS ENHANCER] input blur");
      setTimeout(() => {
        this.justBlurred = false;
      }, 300);
    };

    inputElement.addEventListener("invalid", this.onInvalid);
    inputElement.addEventListener("blur", this.onBlur);
    // @ts-ignore
    console.log("[MLS ENHANCER] listeners attached");
  }

  handleErrorLabel(delay) {
    setTimeout(() => {
      const errorLabelElement = this.target;
      const wrapper = this.element.querySelector(".wrapper");
      // @ts-ignore
      console.log("[MLS ENHANCER] handleErrorLabel", {
        hasErrorLabel: !!errorLabelElement,
        hasWrapper: !!wrapper,
      });
    }, delay);
  }

  observeHiddenInputs() {
    const container = this.element.querySelector(".input_inner_container");
    if (!container) {
      // @ts-ignore
      console.log("[MLS ENHANCER] no .input_inner_container found");
      return;
    }

    this.mutationObserver = new MutationObserver((mutations) => {
      // @ts-ignore
      console.log("[MLS ENHANCER] hidden inputs observer mutations", mutations.length);
      const hiddenInputs = container.querySelectorAll('input[type="hidden"]');
      // @ts-ignore
      console.log("[MLS ENHANCER] hidden inputs count", hiddenInputs.length);
      if (hiddenInputs.length > 0) {
        this.clearError({});
      }
    });

    this.mutationObserver.observe(container, { childList: true });
    // @ts-ignore
    console.log("[MLS ENHANCER] hidden inputs observer attached");
  }

  observeRogueErrorInsideInnerContainer() {
    const container = this.element.querySelector(".input_inner_container");
    if (!container) {
      // @ts-ignore
      console.log("[MLS ENHANCER] no .input_inner_container for rogue observer");
      return;
    }

    this.rogueErrorObserver = new MutationObserver((mutations) => {
      // @ts-ignore
      console.log("[MLS ENHANCER] rogue error observer mutations", mutations.length, "justBlurred:", this.justBlurred);
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.classList.contains("pb_body_kit_negative")
          ) {
            // @ts-ignore
            console.log("[MLS ENHANCER] pb_body_kit_negative added inside inner container", node);
          }
        }
      }
    });

    this.rogueErrorObserver.observe(container, { childList: true, subtree: true });
    // @ts-ignore
    console.log("[MLS ENHANCER] rogue error observer attached");
  }

  clearError(e) {
    // @ts-ignore
    console.log("[MLS ENHANCER] clearError called", e);
  }
}
