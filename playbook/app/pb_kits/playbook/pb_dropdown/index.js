import PbEnhancedElement from "../pb_enhanced_element";
import { PbDropdownKeyboard } from "./keyboard_accessibility";

const DROPDOWN_SELECTOR = "[data-pb-dropdown]";
const TRIGGER_SELECTOR = "[data-dropdown-trigger]";
const CONTAINER_SELECTOR = "[data-dropdown-container]";
const DOWN_ARROW_SELECTOR = "#dropdown_open_icon";
const UP_ARROW_SELECTOR = "#dropdown_close_icon";
const OPTION_SELECTOR = "[data-dropdown-option-label]";
const CUSTOM_DISPLAY_SELECTOR = "[data-dropdown-custom-trigger]";
const DROPDOWN_TRIGGER_DISPLAY = "#dropdown_trigger_display";
const DROPDOWN_PLACEHOLDER = "[data-dropdown-placeholder]";
const DROPDOWN_INPUT = "#dropdown-selected-option";
const SEARCH_INPUT_SELECTOR = "[data-dropdown-autocomplete]";
const SEARCH_BAR_SELECTOR = "[data-dropdown-search]";
const CLEAR_ICON_SELECTOR = "#dropdown_clear_icon";

export default class PbDropdown extends PbEnhancedElement {
  static get selector() {
    return DROPDOWN_SELECTOR;
  }

  get target() {
    return this.element.parentNode.querySelector(CONTAINER_SELECTOR);
  }

  selectedOptions = new Set();
  clearBtn = null;

  connect() {
    this.keyboardHandler = new PbDropdownKeyboard(this);
    this.isMultiSelect = this.element.dataset.pbDropdownMultiSelect === "true";
    this.formPillProps = this.element.dataset.formPillProps
      ? JSON.parse(this.element.dataset.formPillProps)
      : {};
    this.setDefaultValue();
    this.bindEventListeners();
    this.bindSearchInput();
    this.updateArrowDisplay(false);
    this.handleFormValidation();
    this.handleFormReset();
    this.bindSearchBar();
    this.updatePills();

    this.clearBtn = this.element.querySelector(CLEAR_ICON_SELECTOR);
    if (this.clearBtn) {
      this.clearBtn.style.display = "none";
      this.clearBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.clearSelection();
      });
    }
    this.updateClearButton();
  }

  updateClearButton() {
    if (!this.clearBtn) return;
    const hasSelection = this.isMultiSelect
      ? this.selectedOptions.size > 0
      : Boolean(this.element.querySelector(DROPDOWN_INPUT).value);

    this.clearBtn.style.display = hasSelection ? "" : "none";
  }

  bindEventListeners() {
    const customTrigger =
      this.element.querySelector(CUSTOM_DISPLAY_SELECTOR) || this.element;
    customTrigger.addEventListener("click", () =>
      this.toggleElement(this.target)
    );

    this.target.addEventListener("click", this.handleOptionClick.bind(this));
    document.addEventListener(
      "click",
      this.handleDocumentClick.bind(this),
      true
    );
  }

  bindSearchBar() {
    this.searchBar = this.element.querySelector(SEARCH_BAR_SELECTOR);
    if (!this.searchBar) return;

    this.searchBar.addEventListener("input", (e) =>
      this.handleSearch(e.target.value)
    );
  }

  bindSearchInput() {
    this.searchInput = this.element.querySelector(SEARCH_INPUT_SELECTOR);
    if (!this.searchInput) return;

    // Focus the input when anyone clicks the wrapper
    this.element
      .querySelector(TRIGGER_SELECTOR)
      ?.addEventListener("click", () => this.searchInput.focus());

    // Live filter
    this.searchInput.addEventListener("input", (e) =>
      this.handleSearch(e.target.value)
    );
  }

  adjustDropdownHeight() {
    if (this.target.classList.contains("open")) {
      const el = this.target;
      el.style.height = "auto";
      requestAnimationFrame(() => {
        const newHeight = el.scrollHeight + "px";
        el.offsetHeight; // force reflow
        el.style.height = newHeight;
      });
    }
  }

  handleSearch(term = "") {
    const lcTerm = term.toLowerCase();
    this.element.querySelectorAll(OPTION_SELECTOR).forEach((opt) => {
      const label = JSON.parse(opt.dataset.dropdownOptionLabel)
        .label.toString()
        .toLowerCase();

      // hide or show option
      const match = label.includes(lcTerm);
      opt.style.display = match ? "" : "none";
    });

    this.adjustDropdownHeight();
  }

  handleOptionClick(event) {
    const option = event.target.closest(OPTION_SELECTOR);
    const hiddenInput = this.element.querySelector(DROPDOWN_INPUT);

    if (option) {
      const value = option.dataset.dropdownOptionLabel;
      if (this.isMultiSelect) {
        const alreadySelected = this.selectedOptions.has(value);
        if (alreadySelected) {
          this.selectedOptions.delete(value);
        } else {
          this.selectedOptions.add(value);
        }
        this.updatePills();
        this.syncHiddenInputs();
      } else {
        hiddenInput.value = JSON.parse(value).id;
      }

      this.clearFormValidation(hiddenInput);
      this.onOptionSelected(value, option);
      this.updateClearButton();
    }
  }

  handleDocumentClick(event) {
    if (event.target.closest(SEARCH_BAR_SELECTOR)) return;
    if (this.isClickOutside(event) && this.target.classList.contains("open")) {
      this.hideElement(this.target);
      this.updateArrowDisplay(false);
    }
  }

  isClickOutside(event) {
    const customTrigger = this.element.querySelector(CUSTOM_DISPLAY_SELECTOR);
    if (customTrigger) {
      return !customTrigger.contains(event.target);
    } else {
      const triggerElement = this.element.querySelector(TRIGGER_SELECTOR);
      const containerElement =
        this.element.parentNode.querySelector(CONTAINER_SELECTOR);

      const isOutsideTrigger = triggerElement
        ? !triggerElement.contains(event.target)
        : true;
      const isOutsideContainer = containerElement
        ? !containerElement.contains(event.target)
        : true;

      return isOutsideTrigger && isOutsideContainer;
    }
  }

  emitSelectionChange() {
    let detail;

    if (this.isMultiSelect) {
      detail = Array.from(this.selectedOptions).map(JSON.parse);
    } else {
      const hiddenInput = this.element.querySelector(DROPDOWN_INPUT);
      detail = hiddenInput.value
        ? JSON.parse(
            this.element.querySelector(
              OPTION_SELECTOR +
                `[data-dropdown-option-label*='"id":"${hiddenInput.value}"']`
            ).dataset.dropdownOptionLabel
          )
        : null;
    }
    this.element.setAttribute("data-option-selected", JSON.stringify(detail));
    this.element.dispatchEvent(
      new CustomEvent("pb:dropdown:selected", {
        detail,
        bubbles: true,
      })
    );
  }

  onOptionSelected(value, selectedOption) {
    const triggerElement = this.element.querySelector(DROPDOWN_TRIGGER_DISPLAY);
    const customDisplayElement = this.element.querySelector(
      "#dropdown_trigger_custom_display"
    );

    if (triggerElement) {
      if (!this.isMultiSelect) {
        const selectedLabel = JSON.parse(value).label;
        triggerElement.textContent = selectedLabel;
        this.emitSelectionChange();
      }
      if (customDisplayElement) {
        triggerElement.textContent = "";
        customDisplayElement.style.display = "block";
        customDisplayElement.style.paddingRight = "8px";
      }
    }

    const autocompleteInput = this.element.querySelector(SEARCH_INPUT_SELECTOR);
    if (autocompleteInput && !this.isMultiSelect) {
      autocompleteInput.value = JSON.parse(value).label;
    }

    const customTrigger = this.element.querySelector(CUSTOM_DISPLAY_SELECTOR);
    if (customTrigger) {
      if (this.target.classList.contains("open")) {
        this.hideElement(this.target);
        this.updateArrowDisplay(false);
      }
    }

    const options = this.element.querySelectorAll(OPTION_SELECTOR);
    if (this.isMultiSelect) {
      this.emitSelectionChange();
      Array.from(this.selectedOptions).map((option) => {
        if (
          JSON.parse(option).id ===
          JSON.parse(selectedOption.dataset.dropdownOptionLabel).id
        ) {
          selectedOption.style.display = "none";
          this.adjustDropdownHeight();
        }
      });
    } else {
      options.forEach((option) => {
        option.classList.remove("pb_dropdown_option_selected");
      });
      selectedOption.classList.add("pb_dropdown_option_selected");
    }
    this.updateClearButton();
  }

  showElement(elem) {
    elem.classList.remove("close");
    elem.classList.add("open");
    elem.style.height = elem.scrollHeight + "px";
  }

  hideElement(elem) {
    elem.style.height = elem.scrollHeight + "px";
    window.setTimeout(() => {
      elem.classList.add("close");
      elem.classList.remove("open");
      this.resetFocus();
    }, 0);
  }

  resetFocus() {
    if (this.keyboardHandler) {
      this.keyboardHandler.focusedOptionIndex = -1;
      const options = this.element.querySelectorAll(OPTION_SELECTOR);
      options.forEach((option) =>
        option.classList.remove("pb_dropdown_option_focused")
      );
    }
  }

  toggleElement(elem) {
    if (elem.classList.contains("open")) {
      this.hideElement(elem);
      this.updateArrowDisplay(false);
      return;
    }
    this.showElement(elem);
    this.updateArrowDisplay(true);
  }

  updateArrowDisplay(isOpen) {
    const downArrow = this.element.querySelector(DOWN_ARROW_SELECTOR);
    const upArrow = this.element.querySelector(UP_ARROW_SELECTOR);
    if (downArrow && upArrow) {
      downArrow.style.display = isOpen ? "none" : "inline-block";
      upArrow.style.display = isOpen ? "inline-block" : "none";
    }
  }

  handleFormValidation() {
    const hiddenInput = this.element.querySelector(DROPDOWN_INPUT);

    hiddenInput.addEventListener(
      "invalid",
      function (event) {
        if (hiddenInput.hasAttribute("required") && hiddenInput.value === "") {
          event.preventDefault();
          hiddenInput.closest(".dropdown_wrapper").classList.add("error");
        }
      },
      true
    );
  }

  clearFormValidation(input) {
    if (input.checkValidity()) {
      const dropdownWrapperElement = input.closest(".dropdown_wrapper");
      dropdownWrapperElement.classList.remove("error");

      const errorLabelElement = dropdownWrapperElement.querySelector(
        ".pb_body_kit_negative"
      );
      if (errorLabelElement) {
        errorLabelElement.remove();
      }
    }
  }

  setDefaultValue() {
    const hiddenInput = this.element.querySelector(DROPDOWN_INPUT);
    const optionEls = Array.from(
      this.element.querySelectorAll(OPTION_SELECTOR)
    );
    const defaultValue = hiddenInput.dataset.defaultValue || "";
    if (!defaultValue) return;

    if (this.isMultiSelect) {
      const ids = defaultValue.split(",");
      ids.forEach((id) => {
        const selectedOption = optionEls.find((opt) => {
          try {
            return JSON.parse(opt.dataset.dropdownOptionLabel).id === id;
          } catch {
            return false;
          }
        });
        if (!selectedOption) {
          console.warn(`Dropdown default ID ${id} not found`);
          return;
        }

        const raw = selectedOption.dataset.dropdownOptionLabel;
        this.selectedOptions.add(raw);

        selectedOption.style.display = "none";
      });

      this.updatePills();
      this.updateClearButton();
      this.adjustDropdownHeight();
      this.syncHiddenInputs();
    } else {
      hiddenInput.value = defaultValue;
      const selectedOption = optionEls.find((opt) => {
        try {
          return (
            JSON.parse(opt.dataset.dropdownOptionLabel).id === defaultValue
          );
        } catch {
          return false;
        }
      });
      if (!selectedOption) return;

      selectedOption.classList.add("pb_dropdown_option_selected");
      this.setTriggerElementText(
        JSON.parse(selectedOption.dataset.dropdownOptionLabel).label
      );
    }
  }

  handleFormReset() {
    const form = this.element.closest("form");

    if (form) {
      form.addEventListener("reset", () => {
        this.resetDropdownValue();
      });
    }
  }

  resetDropdownValue() {
    const hiddenInput = this.element.querySelector(DROPDOWN_INPUT);
    const options = this.element.querySelectorAll(OPTION_SELECTOR);
    options.forEach((option) => {
      option.classList.remove("pb_dropdown_option_selected");
      option.style.display = "";
    });

    hiddenInput.value = "";

    const defaultPlaceholder = this.element.querySelector(DROPDOWN_PLACEHOLDER);
    this.setTriggerElementText(defaultPlaceholder.dataset.dropdownPlaceholder);

    if (this.searchInput) {
      this.searchInput.value = "";
      if (this.target.classList.contains("open")) {
        const el = this.target;
        el.style.height = "auto";
        requestAnimationFrame(() => {
          const newHeight = el.scrollHeight + "px";
          el.offsetHeight; // force reflow
          el.style.height = newHeight;
        });
      }
    }
    if (this.isMultiSelect) {
      this.selectedOptions.clear();
      this.updatePills();
      this.updateClearButton();
      this.syncHiddenInputs();
    }
  }

  setTriggerElementText(text) {
    const triggerElement = this.element.querySelector(DROPDOWN_TRIGGER_DISPLAY);
    if (triggerElement) {
      triggerElement.textContent = text;
    }
  }

  updatePills() {
    if (!this.isMultiSelect) return;

    const wrapper = this.element.querySelector("#dropdown_pills_wrapper");
    const placeholder = this.element.querySelector(
      "#dropdown_trigger_display_multi_select"
    );
    if (!wrapper) return;

    wrapper.innerHTML = "";
    // Show or hide the placeholder based on selected options
    if (placeholder) {
      if (this.selectedOptions.size > 0) {
        placeholder.style.display = "none";
      } else {
        placeholder.style.display = "";
      }
    }

    Array.from(this.selectedOptions).map((option) => {
      // Create a form pill for each selected option
      const pill = document.createElement("div");
      const color = this.formPillProps.color || "primary";
      pill.classList.add(`pb_form_pill_kit_${color}`, "mr_xs");
      if (this.formPillProps.size === "small") {
        pill.classList.add("small");
      }
      pill.tabIndex = 0;
      pill.dataset.pillId = JSON.parse(option).id;
      const innerDiv = document.createElement("h3");
      innerDiv.className = "pb_title_kit_size_4 pb_form_pill_text";
      innerDiv.textContent = JSON.parse(option).label;
      pill.appendChild(innerDiv);

      const closeIcon = document.createElement("div");
      closeIcon.className = "pb_form_pill_close";
      closeIcon.innerHTML = `<svg class="pb_custom_icon svg-inline--fa svg_${
        this.formPillProps.size === "small" ? "xs" : "sm"
      } svg_fw" xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 31 25"><path fill="currentColor" d="M23.0762 6.77734L17.4512 12.4023L23.0293 17.9805C23.498 18.4023 23.498 19.1055 23.0293 19.5273C22.6074 19.9961 21.9043 19.9961 21.4824 19.5273L15.8574 13.9492L10.2793 19.5273C9.85742 19.9961 9.1543 19.9961 8.73242 19.5273C8.26367 19.1055 8.26367 18.4023 8.73242 17.9336L14.3105 12.3555L8.73242 6.77734C8.26367 6.35547 8.26367 5.65234 8.73242 5.18359C9.1543 4.76172 9.85742 4.76172 10.3262 5.18359L15.9043 10.8086L21.4824 5.23047C21.9043 4.76172 22.6074 4.76172 23.0762 5.23047C23.498 5.65234 23.498 6.35547 23.0762 6.77734Z"/></svg>`;
      pill.appendChild(closeIcon);

      closeIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = pill.dataset.pillId;
        this.selectedOptions.delete(option);

        const optEl = this.element.querySelector(
          `${OPTION_SELECTOR}[data-dropdown-option-label*='"id":${JSON.stringify(
            id
          )}']`
        );
        if (optEl) {
          optEl.style.display = "";
          if (this.target.classList.contains("open")) {
            this.showElement(this.target);
          }
        }

        this.updatePills();
        this.updateClearButton();
        this.emitSelectionChange();
        this.syncHiddenInputs();
      });
      wrapper.appendChild(pill);
    });
  }

  clearSelection() {
    if (this.isMultiSelect) {
      this.selectedOptions.clear();
      this.element.querySelectorAll(OPTION_SELECTOR).forEach((opt) => {
        opt.style.display = "";
      });
      if (this.target.classList.contains("open")) {
        this.showElement(this.target);
      }
    }
    const customDisplay = this.element.querySelector(
      "#dropdown_trigger_custom_display"
    );
    if (customDisplay) {
      customDisplay.style.display = "none";
    }
    this.resetDropdownValue();
    this.updatePills();
    this.updateClearButton();
    this.syncHiddenInputs();
    this.emitSelectionChange();
  }

  syncHiddenInputs() {
    if (!this.isMultiSelect) return;
    this.element
      .querySelectorAll('input[data-generated="true"]')
      .forEach((n) => n.remove());

    const baseInput = this.element.querySelector(DROPDOWN_INPUT);
    if (!baseInput) return;
    // for multi_select, for each selectedOption, create a hidden input
    const name = baseInput.getAttribute("name");
    this.selectedOptions.forEach((raw) => {
      const id = JSON.parse(raw).id;
      const inp = document.createElement("input");
      inp.type = "hidden";
      inp.name = name;
      inp.value = id;
      inp.dataset.generated = "true";
      baseInput.insertAdjacentElement("afterend", inp);
    });
    baseInput.value = "";
  }

  handleBackspaceClear() {
    if (!this.isMultiSelect) {
      this.element.querySelectorAll(OPTION_SELECTOR).forEach((opt) => {
        opt.classList.remove("pb_dropdown_option_selected");
        opt.style.display = "";
        this.adjustDropdownHeight();
      });

      const hiddenInput = this.element.querySelector(DROPDOWN_INPUT);
      if (hiddenInput) hiddenInput.value = "";

      const placeholder = this.element.querySelector(DROPDOWN_PLACEHOLDER);
      if (placeholder)
        this.setTriggerElementText(placeholder.dataset.dropdownPlaceholder);
    }
    if (this.isMultiSelect) {
      this.element.querySelectorAll(OPTION_SELECTOR).forEach((opt) => {
        const optValue = opt.dataset.dropdownOptionLabel;
        if (
          this.selectedOptions.size > 0 &&
          this.selectedOptions.has(optValue)
        ) {
          opt.style.display = "none";
        } else {
          opt.style.display = "";
        }
        this.adjustDropdownHeight();
      });
    }
  }
}
