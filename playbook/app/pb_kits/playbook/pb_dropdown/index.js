import PbEnhancedElement from "../pb_enhanced_element";
import { PbDropdownKeyboard } from "./keyboard_accessibility";
import { setArrowVisibility, toggleVisibility } from "../utilities/domHelpers";
import { subscribeFloatingKitReposition, positionDropdownPortalToWrapper } from "../utilities/floatingPortalHosts";

const DROPDOWN_SELECTOR = "[data-pb-dropdown]";
const TRIGGER_SELECTOR = "[data-dropdown-trigger]";
const CONTAINER_SELECTOR = "[data-dropdown-container]";
const DOWN_ARROW_SELECTOR = "[data-dropdown-open-icon]";
const UP_ARROW_SELECTOR = "[data-dropdown-close-icon]";
const OPTION_SELECTOR = "[data-dropdown-option-label]";
const CUSTOM_DISPLAY_SELECTOR = "[data-dropdown-custom-trigger]";
const DROPDOWN_TRIGGER_DISPLAY = "[data-dropdown-trigger-display]";
const DROPDOWN_PLACEHOLDER = "[data-dropdown-placeholder]";
const DROPDOWN_INPUT = "[data-dropdown-selected-option]";
const SEARCH_INPUT_SELECTOR = "[data-dropdown-autocomplete]";
const SEARCH_BAR_SELECTOR = "[data-dropdown-search]";
const CLEAR_ICON_SELECTOR = "[data-dropdown-clear-icon]";
const LABEL_SELECTOR = '[data-dropdown="pb-dropdown-label"]';

// Portal host + positioning (parity with utilities/floatingPortalHosts.ts + React Dropdown).
const PB_DIALOG_FLOATING_ROOT = "[data-pb-dialog-floating-root]";
const PB_FLOATING_OWNER_ATTR = "data-pb-floating-owner";

function resolveFloatingOwnerId(fromElement) {
  if (!fromElement) return null;
  const marked = fromElement.closest(`[${PB_FLOATING_OWNER_ATTR}]`);
  if (marked) return marked.getAttribute(PB_FLOATING_OWNER_ATTR);
  const popoverEl = fromElement.closest(".pb_popover_tooltip");
  if (popoverEl?.id) return popoverEl.id;
  const dialogEl = fromElement.closest("dialog, .pb_dialog");
  if (dialogEl?.id) return dialogEl.id;
  return null;
}

const DIALOG_DIRECT_FLOATING_ROOT = `:scope > ${PB_DIALOG_FLOATING_ROOT}`;
const POPOVER_FLOATING_ROOT = `:scope > .pb_popover_body > ${PB_DIALOG_FLOATING_ROOT}`;

function resolveDialogFloatingPortalHost(fromElement) {
  if (!fromElement) return null;
  const dialogEl = fromElement.closest("dialog");
  if (dialogEl) {
    return dialogEl.querySelector(DIALOG_DIRECT_FLOATING_ROOT) || dialogEl;
  }
  const reactModalShell = fromElement.closest(".pb_dialog");
  if (reactModalShell) {
    return (
      reactModalShell.querySelector(DIALOG_DIRECT_FLOATING_ROOT) ||
      reactModalShell
    );
  }
  const popoverEl = fromElement.closest(".pb_popover_tooltip");
  if (popoverEl) {
    return (
      popoverEl.querySelector(POPOVER_FLOATING_ROOT) ||
      popoverEl.querySelector(PB_DIALOG_FLOATING_ROOT) ||
      popoverEl
    );
  }
  return null;
}

function resolvePortaledKitHost(kitRoot, dialogCtxTarget) {
  if (typeof document === "undefined") return null;
  if (kitRoot && kitRoot.closest(".pb_popover_tooltip")) {
    return document.body;
  }
  return (
    resolveDialogFloatingPortalHost(kitRoot) || dialogCtxTarget || null
  );
}

function clearDropdownPortalPanelStyles(panel) {
  [
    "position",
    "left",
    "top",
    "right",
    "bottom",
    "width",
    "z-index",
    "margin",
  ].forEach((prop) => {
    panel.style.removeProperty(prop);
  });
}

export default class PbDropdown extends PbEnhancedElement {
  static get selector() {
    return DROPDOWN_SELECTOR;
  }

  get target() {
    return this.cachedElements?.target || this.element.querySelector(CONTAINER_SELECTOR);
  }

  get baseInput() {
    return this.cachedElements?.baseInput || this.element.querySelector(DROPDOWN_INPUT);
  }

  get trigger() {
    return this.cachedElements?.trigger || this.element.querySelector(TRIGGER_SELECTOR);
  }

  get customTrigger() {
    return this.cachedElements?.customTrigger || this.element.querySelector(CUSTOM_DISPLAY_SELECTOR);
  }

  get dropdownWrapper() {
    return this.cachedElements?.dropdownWrapper || this.element.querySelector(".dropdown_wrapper");
  }

  get placeholder() {
    return this.cachedElements?.placeholder || this.element.querySelector(DROPDOWN_PLACEHOLDER);
  }

  cacheElements() {
    this.cachedElements = {
      target: this.element.querySelector(CONTAINER_SELECTOR),
      baseInput: this.element.querySelector(DROPDOWN_INPUT),
      trigger: this.element.querySelector(TRIGGER_SELECTOR),
      customTrigger: this.element.querySelector(CUSTOM_DISPLAY_SELECTOR),
      dropdownWrapper: this.element.querySelector(".dropdown_wrapper"),
      placeholder: this.element.querySelector(DROPDOWN_PLACEHOLDER),
    };
  }

  /** Options live under `[data-dropdown-container]`; use this when the menu is portaled to body. */
  queryAllOptions() {
    const root = this.target || this.element;
    return root.querySelectorAll(OPTION_SELECTOR);
  }

  selectedOptions = new Set();
  clearBtn = null;

  connect() {
    // Store instance on element for DatePicker sync
    this.element._pbDropdownInstance = this;
    this.cacheElements();

    this.portalHost = null;
    this.useMenuPortal = false;
    this.floatingOwnerId = null;
    this._floatingResolved = false;
    this.portalShell = null;
    this._portalParent = null;
    this._portalNext = null;
    this.boundApplyPortalPosition = () => {
      if (this.target?.classList.contains("open")) {
        this.applyPortalPosition();
      }
    };

    this.keyboardHandler = new PbDropdownKeyboard(this);
    this.isDisabled = this.element.dataset.pbDropdownDisabled === "true";
    this.isMultiSelect = this.element.dataset.pbDropdownMultiSelect === "true";
    this.closeOnClick = this.element.dataset.pbDropdownCloseOnClick || "any";
    this.formPillProps = this.element.dataset.formPillProps
      ? JSON.parse(this.element.dataset.formPillProps)
      : {};
    const baseInput = this.baseInput;
    this.wasOriginallyRequired =
      baseInput && baseInput.hasAttribute("required");
    this.setDefaultValue();
    this.bindEventListeners();
    this.bindSearchInput();
    this.updateArrowDisplay(false);
    this.handleFormValidation();
    this.handleFormReset();
    this.bindSearchBar();
    this.updatePills();

    this.clearBtn = this.element.querySelector(CLEAR_ICON_SELECTOR);
    this.isClearable = this.element.dataset.pbDropdownClearable !== "false";
    if (this.clearBtn) {
      this.clearBtn.style.display = "none";
      this.clearBtnHandler = (e) => {
        e.stopPropagation();
        this.clearSelection();
      }
      this.clearBtn.addEventListener("click", this.clearBtnHandler);
    }
    this.updateClearButton();
    this.applyDisabledState();

    // Listen for clear and select events from external source
    this.handleClearEventBound = this.handleClearEvent.bind(this);
    document.addEventListener("pb:dropdown:clear", this.handleClearEventBound);
    this.handleSelectEventBound = this.handleSelectEvent.bind(this);
    document.addEventListener("pb:dropdown:select", this.handleSelectEventBound);

    // Listen for custom_event_type to clear on custom events
    const customEventTypeString = this.element.dataset.customEventType;
    if (customEventTypeString) {
      this.customClearEventTypes = customEventTypeString
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);
      this.handleCustomClearBound = this.handleCustomClearEvent.bind(this);
      this.customClearEventTypes.forEach((eventType) => {
        document.addEventListener(eventType, this.handleCustomClearBound);
      });
    }
  }

  disconnect() {
    this.unmountPortalMenu();

    // Clean up stored instance reference
    if (this.element._pbDropdownInstance === this) {
      delete this.element._pbDropdownInstance
    }

    // Clean up keyboard handler
    if (this.keyboardHandler && typeof this.keyboardHandler.disconnect === 'function') {
      this.keyboardHandler.disconnect()
    }

    // Clean up custom trigger click listener
    if (this.customTriggerClickHandler) {
      const customTrigger = this.customTrigger || this.element
      customTrigger.removeEventListener('click', this.customTriggerClickHandler)
    }

    // Clean up target click listener
    if (this.handleOptionClickBound) {
      this.target.removeEventListener('click', this.handleOptionClickBound)
    }

    // Clean up document click listener
    if (this.handleDocumentClickBound) {
      document.removeEventListener('click', this.handleDocumentClickBound, true)
    }

    // Clean up search bar listener
    if (this.searchBar && this.searchBarHandler) {
      this.searchBar.removeEventListener('input', this.searchBarHandler)
    }

    // Clean up search input listeners
    if (this.searchInput) {
      if (this.searchInputFocusHandler) {
        const trigger = this.trigger
        if (trigger) {
          trigger.removeEventListener('click', this.searchInputFocusHandler)
        }
      }
      if (this.searchInputHandler) {
        this.searchInput.removeEventListener('input', this.searchInputHandler)
      }
    }

    // Clean up clear button listener
    if (this.clearBtn && this.clearBtnHandler) {
      this.clearBtn.removeEventListener('click', this.clearBtnHandler)
    }

    // Clean up external clear/select listeners
    if (this.handleClearEventBound) {
      document.removeEventListener("pb:dropdown:clear", this.handleClearEventBound)
    }
    if (this.handleSelectEventBound) {
      document.removeEventListener("pb:dropdown:select", this.handleSelectEventBound)
    }
    if (this.customClearEventTypes && this.handleCustomClearBound) {
      this.customClearEventTypes.forEach((eventType) => {
        document.removeEventListener(eventType, this.handleCustomClearBound)
      })
    }
  }

  updateClearButton() {
    if (!this.clearBtn) return;
    if (!this.isClearable) {
      this.clearBtn.style.display = "none";
      return;
    }
    const hasSelection = this.isMultiSelect
      ? this.selectedOptions.size > 0
      : Boolean(this.baseInput?.value);

    this.clearBtn.style.display = hasSelection ? "" : "none";
  }

  applyDisabledState() {
    if (!this.isDisabled) return;

    const focusableSelector = [
      "a[href]",
      "button",
      "input",
      "select",
      "textarea",
      "[tabindex]",
      "[contenteditable='true']",
      CLEAR_ICON_SELECTOR,
      DOWN_ARROW_SELECTOR,
      UP_ARROW_SELECTOR,
    ].join(",");

    this.element.querySelectorAll(focusableSelector).forEach((element) => {
      element.setAttribute("aria-disabled", "true");
      element.setAttribute("tabindex", "-1");

      if (element.matches("input, select, textarea, button")) {
        element.setAttribute("disabled", "disabled");
      }
    });

    this.element.querySelectorAll(`${CLEAR_ICON_SELECTOR}, ${DOWN_ARROW_SELECTOR}, ${UP_ARROW_SELECTOR}`).forEach((icon) => {
      icon.setAttribute("aria-hidden", "true");
      icon.setAttribute("focusable", "false");
    });

    this.hideElement(this.target);
    this.updateArrowDisplay(false);
  }

  bindEventListeners() {
    const customTrigger = this.customTrigger || this.element;
    this.customTriggerClickHandler = (e) => {
      const label = e.target.closest(LABEL_SELECTOR);
      if (this.isDisabled) return;
      if (label && label.htmlFor) {
        const trigger = this.element.querySelector(
          `#${CSS.escape(label.htmlFor)}`,
        );
        if (trigger) {
          trigger.focus();
        }
      }
      if (
        this.closeOnClick === "outside" &&
        this.target?.contains(e.target)
      ) {
        return;
      }
      this.toggleElement(this.target);
    }
    customTrigger.addEventListener("click", this.customTriggerClickHandler);

    this.handleOptionClickBound = this.handleOptionClick.bind(this)
    this.target.addEventListener("click", this.handleOptionClickBound);
    
    this.handleDocumentClickBound = this.handleDocumentClick.bind(this)
    document.addEventListener(
      "click",
      this.handleDocumentClickBound,
      true,
    );
  }

  bindSearchBar() {
    this.searchBar = this.element.querySelector(SEARCH_BAR_SELECTOR);
    if (!this.searchBar) return;

    this.searchBarHandler = (e) => this.handleSearch(e.target.value)
    this.searchBar.addEventListener('input', this.searchBarHandler);
  }

  bindSearchInput() {
    this.searchInput = this.element.querySelector(SEARCH_INPUT_SELECTOR);
    if (!this.searchInput) return;

    // Focus the input when anyone clicks the wrapper
    this.searchInputFocusHandler = () => this.searchInput.focus()
    this.trigger?.addEventListener('click', this.searchInputFocusHandler);

    // Live filter
    this.searchInputHandler = (e) => this.handleSearch(e.target.value)
    this.searchInput.addEventListener('input', this.searchInputHandler);
  }

  adjustDropdownHeight() {
    if (this.target.classList.contains("open")) {
      const el = this.target;
      const shouldConstrain = el.classList.contains("constrain_height");
      el.style.height = "auto";
      requestAnimationFrame(() => {
        if (shouldConstrain) {
          // Calculate 18em in pixels (matches SCSS max-height: 18em)
          const fontSize = parseFloat(getComputedStyle(el).fontSize) || 16;
          const maxHeight = fontSize * 18;
          const scrollHeight = el.scrollHeight;
          const newHeight = Math.min(scrollHeight, maxHeight);
          el.offsetHeight; // force reflow
          el.style.height = newHeight + "px";
        } else {
          el.offsetHeight; // force reflow
          el.style.height = el.scrollHeight + "px";
        }
        if (this.useMenuPortal) {
          this.applyPortalPosition();
        }
      });
    }
  }

  adjustDropdownPosition(container) {
    if (!container) return;

    if (this.useMenuPortal) {
      this.applyPortalPosition();
      return;
    }

    const wrapper = this.dropdownWrapper;
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const h = container.getBoundingClientRect().height || container.scrollHeight;
    const spaceBelow = window.innerHeight - wrapperRect.bottom;
    const spaceAbove = wrapperRect.top;

    // If not enough space below but enough space above, position above
    if (spaceBelow < h + 10 && spaceAbove >= h + 10) {
      container.style.top = "auto";
      container.style.bottom = "calc(100% + 5px)";
      container.style.marginTop = "0";
      container.style.marginBottom = "0";
    } else {
      // Default: position below
      container.style.top = "";
      container.style.bottom = "";
      container.style.marginTop = "";
      container.style.marginBottom = "";
    }
  }

  ensureFloatingPortalConfig() {
    if (this._floatingResolved) return;
    this.portalHost = resolvePortaledKitHost(this.element, null);
    this.floatingOwnerId = resolveFloatingOwnerId(this.element);
    this.useMenuPortal = Boolean(this.portalHost);
    this._floatingResolved = true;
  }

  mountPortalMenu(container) {
    if (!this.useMenuPortal || !this.portalHost) return;
    if (container.dataset.pbDropdownPortaled === "true") return;

    this._portalParent = container.parentNode;
    this._portalNext = container.nextSibling;

    const shell = document.createElement("div");
    shell.className = `${this.element.className} pb_dropdown_floating_shell`.trim();
    if (this.floatingOwnerId) {
      shell.setAttribute(PB_FLOATING_OWNER_ATTR, this.floatingOwnerId);
    }

    const innerWrap = document.createElement("div");
    const hasError = this.dropdownWrapper?.classList.contains("error");
    innerWrap.className = hasError ? "dropdown_wrapper error" : "dropdown_wrapper";
    Object.assign(innerWrap.style, {
      background: "transparent",
      border: "none",
      boxShadow: "none",
      margin: "0",
      minHeight: "0",
      padding: "0",
      position: "static",
    });

    innerWrap.appendChild(container);
    shell.appendChild(innerWrap);
    this.portalHost.appendChild(shell);
    this.portalShell = shell;
    container.dataset.pbDropdownPortaled = "true";
  }

  unmountPortalMenu() {
    if (this._unsubscribePortalReposition) {
      this._unsubscribePortalReposition();
      this._unsubscribePortalReposition = null;
    }
    if (this.boundApplyPortalPosition) {
      window.removeEventListener("resize", this.boundApplyPortalPosition);
    }
    if (!this.target || this.target.dataset.pbDropdownPortaled !== "true") {
      return;
    }
    delete this.target.dataset.pbDropdownPortaled;
    clearDropdownPortalPanelStyles(this.target);

    if (this._portalParent && this.target) {
      if (this._portalNext && this._portalNext.parentNode === this._portalParent) {
        this._portalParent.insertBefore(this.target, this._portalNext);
      } else {
        this._portalParent.appendChild(this.target);
      }
    }
    this._portalParent = null;
    this._portalNext = null;

    if (this.portalShell) {
      this.portalShell.remove();
    }
    this.portalShell = null;
  }

  applyPortalPosition() {
    if (!this.useMenuPortal || !this.portalHost || !this.target || !this.dropdownWrapper) {
      return;
    }
    positionDropdownPortalToWrapper({
      panel: this.target,
      wrapperViewportRect: this.dropdownWrapper.getBoundingClientRect(),
      positionHost: this.portalHost,
    });
  }

  handleSearch(term = "") {
    if (this.isDisabled) return;
    const lcTerm = term.toLowerCase();
    let hasMatch = false;
    this.queryAllOptions().forEach((opt) => {
      //make it so that if the option is selected, it will not show up in the search results
      if (
        this.isMultiSelect &&
        this.selectedOptions.has(opt.dataset.dropdownOptionLabel)
      ) {
        opt.style.display = "none";
        return;
      }
      const label = JSON.parse(opt.dataset.dropdownOptionLabel)
        .label.toString()
        .toLowerCase();

      // hide or show option
      const match = label.includes(lcTerm);
      opt.style.display = match ? "" : "none";
      if (match) hasMatch = true;
    });

    this.adjustDropdownHeight();

    this.removeNoOptionsMessage();
    if (!hasMatch) {
      this.showNoOptionsMessage();
    }
  }

  showNoOptionsMessage() {
    if (this.target?.querySelector(".dropdown_no_options")) return;

    const noOptionElement = document.createElement("div");
    noOptionElement.className =
      "pb_body_kit_light dropdown_no_options pb_item_kit p_xs display_flex justify_content_center";
    noOptionElement.textContent = "no option";

    this.target.appendChild(noOptionElement);
  }

  removeNoOptionsMessage() {
    const existing = this.target?.querySelector(".dropdown_no_options");
    if (existing) {
      existing.remove();
    }
  }

  handleOptionClick(event) {
    if (this.isDisabled) return;
    const option = event.target.closest(OPTION_SELECTOR);
    const hiddenInput = this.baseInput;

    if (option) {
      if (option.dataset.dropdownOptionDisabled === "true") return;

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
        if (this.searchInput && this.isMultiSelect) {
          this.searchInput.value = "";
          this.handleBackspaceClear();
        }
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
    const shouldCloseOnOutsideClick =
      this.closeOnClick === "outside" || this.closeOnClick === "any";
    if (
      shouldCloseOnOutsideClick &&
      this.isClickOutside(event) &&
      this.target.classList.contains("open")
    ) {
      this.hideElement(this.target);
      this.updateArrowDisplay(false);
    }
  }

  // ----- External events handling section -----
  // Handles pb:dropdown:clear - clear this dropdown when event.detail.dropdownId matches.
  handleClearEvent(event) {
    if (this.isDisabled) return;
    const targetId = event.detail?.dropdownId;
    if (targetId && this.element.id === targetId) {
      this.clearSelection();
    }
  }

  // Handles custom_event_type events (e.g. turbo:submit-end) - clear when detail.dropdownId matches or is omitted.
  handleCustomClearEvent(event) {
    if (this.isDisabled) return;
    const targetId = event.detail?.dropdownId;
    if (targetId == null || this.element.id === targetId) {
      this.clearSelection();
    }
  }

  // Handles pb:dropdown:select - set dropdown selection by option id(s).
  // Single: detail: { dropdownId, optionId }. Multi: detail: { dropdownId, optionIds: ['id1', 'id2'] }.
  handleSelectEvent(event) {
    if (this.isDisabled) return;
    const targetId = event.detail?.dropdownId;
    if (!targetId || this.element.id !== targetId) return;

    const optionId = event.detail?.optionId;
    const optionIds = event.detail?.optionIds;
    if (optionId != null) {
      this.setSelectionByOptionId(optionId);
    } else if (Array.isArray(optionIds)) {
      this.setSelectionByOptionIds(optionIds);
    }
  }

  // Set single-select dropdown to the option with the given id. No-op if id not found.
  setSelectionByOptionId(optionId) {
    if (this.isMultiSelect) return;
    const hiddenInput = this.baseInput;
    const optionEls = Array.from(this.queryAllOptions());
    const selectedOption = optionEls.find((opt) => {
      try {
        return JSON.parse(opt.dataset.dropdownOptionLabel).id === optionId;
      } catch {
        return false;
      }
    });
    if (!selectedOption) return;
    if (selectedOption.dataset.dropdownOptionDisabled === "true") return;

    optionEls.forEach((opt) => opt.classList.remove("pb_dropdown_option_selected"));
    selectedOption.classList.add("pb_dropdown_option_selected");
    if (hiddenInput) hiddenInput.value = optionId;
    const optionData = JSON.parse(selectedOption.dataset.dropdownOptionLabel);
    const customDisplayElement = this.element.querySelector(
      '[data-dropdown-trigger-custom-display]',
    );
    if (customDisplayElement) {
      this.setTriggerElementText("");
      customDisplayElement.style.display = "block";
      customDisplayElement.style.paddingRight = "8px";
    } else {
      this.setTriggerElementText(optionData.label);
    }
    if (this.searchInput) {
      this.searchInput.value = optionData.label;
    }

    if (optionData.formatted_start_date && optionData.formatted_end_date) {
      const startDateId = this.element.dataset.startDateId;
      const endDateId = this.element.dataset.endDateId;
      const controlsStartId = this.element.dataset.controlsStartId;
      const controlsEndId = this.element.dataset.controlsEndId;
      if (startDateId) {
        const startDateInput = document.getElementById(startDateId);
        if (startDateInput) startDateInput.value = optionData.formatted_start_date;
      }
      if (endDateId) {
        const endDateInput = document.getElementById(endDateId);
        if (endDateInput) endDateInput.value = optionData.formatted_end_date;
      }
      const syncDatePickers = () => {
        if (controlsStartId) {
          const startPicker = document.querySelector(`#${CSS.escape(controlsStartId)}`)?._flatpickr;
          if (startPicker) startPicker.setDate(optionData.formatted_start_date, true, "m/d/Y");
        }
        if (controlsEndId) {
          const endPicker = document.querySelector(`#${CSS.escape(controlsEndId)}`)?._flatpickr;
          if (endPicker) endPicker.setDate(optionData.formatted_end_date, true, "m/d/Y");
        }
      };
      syncDatePickers();
      setTimeout(syncDatePickers, 100);
      setTimeout(syncDatePickers, 300);
    }

    this.updateClearButton();
    this.emitSelectionChange();
  }

  // Set multi-select dropdown to the options with the given ids. Invalid ids are skipped.
  setSelectionByOptionIds(optionIds) {
    if (!this.isMultiSelect || !optionIds.length) return;
    const optionEls = Array.from(this.queryAllOptions());
    this.selectedOptions.clear();
    optionEls.forEach((opt) => {
      opt.classList.remove("pb_dropdown_option_selected");
      opt.style.display = "";
    });

    optionIds.forEach((id) => {
      const opt = optionEls.find((o) => {
        try {
          return JSON.parse(o.dataset.dropdownOptionLabel).id === id;
        } catch {
          return false;
        }
      });
      if (opt) {
        if (opt.dataset.dropdownOptionDisabled === "true") return;

        const raw = opt.dataset.dropdownOptionLabel;
        this.selectedOptions.add(raw);
        opt.style.display = "none";
      }
    });

    this.updatePills();
    this.updateClearButton();
    this.adjustDropdownHeight();
    this.syncHiddenInputs();
    this.emitSelectionChange();
  }
  // ----- End External events handling section -----

  isClickOutside(event) {
    const label = event.target.closest(LABEL_SELECTOR);
    if (label && this.element.contains(label)) return false;
    const customTrigger = this.customTrigger;
    if (customTrigger) {
      const clickInTrigger = customTrigger.contains(event.target);
      const clickInContainer = this.target?.contains(event.target);
      return !clickInTrigger && !clickInContainer;
    } else {
      const triggerElement = this.trigger;
      const containerElement = this.target;

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
      const hiddenInput = this.baseInput;
      detail = hiddenInput.value
        ? JSON.parse(
            (this.target || this.element).querySelector(
              OPTION_SELECTOR +
                `[data-dropdown-option-label*='"id":"${hiddenInput.value}"']`,
            ).dataset.dropdownOptionLabel,
          )
        : null;
    }
    this.element.setAttribute("data-option-selected", JSON.stringify(detail));
    this.element.dispatchEvent(
      new CustomEvent("pb:dropdown:selected", {
        detail,
        bubbles: true,
      }),
    );
  }

  onOptionSelected(value, selectedOption) {
    const triggerElement = this.element.querySelector(DROPDOWN_TRIGGER_DISPLAY);
    const customDisplayElement = this.element.querySelector(
      '[data-dropdown-trigger-custom-display]',
    );

    if (triggerElement) {
      if (!this.isMultiSelect) {
        const selectedLabel = JSON.parse(value).label;
        triggerElement.textContent = selectedLabel;
        this.emitSelectionChange();

        // Handle quickpick variant: populate start/end date hidden inputs
        const optionData = JSON.parse(value);
        const startDateId = this.element.dataset.startDateId;
        const endDateId = this.element.dataset.endDateId;
        const controlsStartId = this.element.dataset.controlsStartId;
        const controlsEndId = this.element.dataset.controlsEndId;

        if (optionData.formatted_start_date && optionData.formatted_end_date) {
          // Populate date inputs when option has date fields
          if (startDateId) {
            const startDateInput = document.getElementById(startDateId);
            if (startDateInput)
              startDateInput.value = optionData.formatted_start_date;
          }

          if (endDateId) {
            const endDateInput = document.getElementById(endDateId);
            if (endDateInput)
              endDateInput.value = optionData.formatted_end_date;
          }

          // Sync with DatePickers if controlsStartId/controlsEndId are present
          if (controlsStartId) {
            const startPicker = document.querySelector(
              `#${controlsStartId}`,
            )?._flatpickr;
            if (startPicker) {
              startPicker.setDate(
                optionData.formatted_start_date,
                true,
                "m/d/Y",
              );
            }
          }

          if (controlsEndId) {
            const endPicker = document.querySelector(
              `#${controlsEndId}`,
            )?._flatpickr;
            if (endPicker) {
              endPicker.setDate(optionData.formatted_end_date, true, "m/d/Y");
            }
          }
        } else if (startDateId || endDateId) {
          // Clear date inputs when option doesn't have date fields (e.g., blank selection)
          if (startDateId) {
            const startDateInput = document.getElementById(startDateId);
            if (startDateInput) startDateInput.value = "";
          }

          if (endDateId) {
            const endDateInput = document.getElementById(endDateId);
            if (endDateInput) endDateInput.value = "";
          }

          // Clear DatePickers as well
          if (controlsStartId) {
            const startPicker = document.querySelector(
              `#${controlsStartId}`,
            )?._flatpickr;
            if (startPicker) {
              startPicker.clear();
            }
          }

          if (controlsEndId) {
            const endPicker = document.querySelector(
              `#${controlsEndId}`,
            )?._flatpickr;
            if (endPicker) {
              endPicker.clear();
            }
          }
        }
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
      this.emitSelectionChange();
    }

    const shouldCloseOnOptionSelect =
      this.closeOnClick === "any" || this.closeOnClick === "inside";
    if (shouldCloseOnOptionSelect && this.target.classList.contains("open")) {
      this.hideElement(this.target);
      this.updateArrowDisplay(false);
    }

    const options = this.queryAllOptions();
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
      this.baseInput.value = Array.from(
        this.selectedOptions,
      )
        .map((opt) => JSON.parse(opt).id)
        .join(",");
    } else {
      options.forEach((option) => {
        option.classList.remove("pb_dropdown_option_selected");
      });
      selectedOption.classList.add("pb_dropdown_option_selected");
    }
    this.updateClearButton();
  }

  showElement(elem) {
    if (this.isDisabled) return;
    
    this.ensureFloatingPortalConfig();
    if (this.useMenuPortal) {
      this.mountPortalMenu(elem);
    }

    elem.classList.remove("close");
    elem.classList.add("open");

    const shouldConstrain = elem.classList.contains("constrain_height");
    if (shouldConstrain) {
      // Calculate height respecting max-height constraint (18em)
      const fontSize = parseFloat(getComputedStyle(elem).fontSize) || 16;
      const maxHeight = fontSize * 18; // matches SCSS max-height: 18em
      const scrollHeight = elem.scrollHeight;
      const height = Math.min(scrollHeight, maxHeight);
      elem.style.height = height + "px";
    } else {
      elem.style.height = elem.scrollHeight + "px";
    }

    if (this.useMenuPortal) {
      this.applyPortalPosition();
      window.removeEventListener("resize", this.boundApplyPortalPosition);
      window.addEventListener("resize", this.boundApplyPortalPosition);
      if (this._unsubscribePortalReposition) {
        this._unsubscribePortalReposition();
        this._unsubscribePortalReposition = null;
      }
      this._unsubscribePortalReposition = subscribeFloatingKitReposition(
        this.boundApplyPortalPosition,
      );
      window.requestAnimationFrame(() => this.applyPortalPosition());
    } else {
      this.adjustDropdownPosition(elem);
    }
  }

  hideElement(elem) {
    elem.style.height = elem.scrollHeight + "px";
    window.setTimeout(() => {
      if (this.useMenuPortal) {
        this.unmountPortalMenu();
      }
      elem.classList.add("close");
      elem.classList.remove("open");
      this.resetFocus();
    }, 0);
  }

  resetFocus() {
    if (this.keyboardHandler) {
      this.keyboardHandler.focusedOptionIndex = -1;
      const options = this.queryAllOptions();
      options.forEach((option) =>
        option.classList.remove("pb_dropdown_option_focused"),
      );
    }
  }

  toggleElement(elem) {
    if (this.isDisabled) return;
    const isOpen = toggleVisibility({
      isVisible: elem.classList.contains("open"),
      onHide: () => this.hideElement(elem),
      onShow: () => this.showElement(elem),
    });

    this.updateArrowDisplay(isOpen);
  }

  updateArrowDisplay(isOpen) {
    setArrowVisibility({
      rootElement: this.element,
      downSelector: DOWN_ARROW_SELECTOR,
      upSelector: UP_ARROW_SELECTOR,
      showDownArrow: !isOpen,
    });
  }

  handleFormValidation() {
    const hiddenInput = this.baseInput;

    hiddenInput.addEventListener(
      "invalid",
      function (event) {
        if (hiddenInput.hasAttribute("required") && hiddenInput.value === "") {
          event.preventDefault();
          hiddenInput.closest(".dropdown_wrapper").classList.add("error");
        }
      },
      true,
    );
  }

  clearFormValidation(input) {
    if (this.isMultiSelect) {
      if (this.selectedOptions.size > 0) {
        const dropdownWrapperElement = input.closest(".dropdown_wrapper");
        dropdownWrapperElement.classList.remove("error");
        const errorLabelElement = dropdownWrapperElement.querySelector(
          ".pb_body_kit_negative",
        );
        if (errorLabelElement) {
          errorLabelElement.remove();
        }
        return;
      }
    }

    if (input.checkValidity()) {
      const dropdownWrapperElement = input.closest(".dropdown_wrapper");
      dropdownWrapperElement.classList.remove("error");

      const errorLabelElement = dropdownWrapperElement.querySelector(
        ".pb_body_kit_negative",
      );
      if (errorLabelElement) {
        errorLabelElement.remove();
      }
    }
  }

  setDefaultValue() {
    const hiddenInput = this.baseInput;
    const optionEls = Array.from(
      this.queryAllOptions(),
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
      const optionData = JSON.parse(selectedOption.dataset.dropdownOptionLabel);
      this.setTriggerElementText(optionData.label);

      // Handle quickpick variant: populate start/end date hidden inputs and sync DatePickers
      if (optionData.formatted_start_date && optionData.formatted_end_date) {
        const startDateId = this.element.dataset.startDateId;
        const endDateId = this.element.dataset.endDateId;
        const controlsStartId = this.element.dataset.controlsStartId;
        const controlsEndId = this.element.dataset.controlsEndId;

        if (startDateId) {
          const startDateInput = document.getElementById(startDateId);
          if (startDateInput)
            startDateInput.value = optionData.formatted_start_date;
        }

        if (endDateId) {
          const endDateInput = document.getElementById(endDateId);
          if (endDateInput) endDateInput.value = optionData.formatted_end_date;
        }

        // Sync with DatePickers - retry with delays to ensure DatePickers are initialized
        const syncDatePickers = () => {
          if (controlsStartId) {
            const startPicker = document.querySelector(
              `#${controlsStartId}`,
            )?._flatpickr;
            if (startPicker) {
              startPicker.setDate(
                optionData.formatted_start_date,
                true,
                "m/d/Y",
              );
            }
          }

          if (controlsEndId) {
            const endPicker = document.querySelector(
              `#${controlsEndId}`,
            )?._flatpickr;
            if (endPicker) {
              endPicker.setDate(optionData.formatted_end_date, true, "m/d/Y");
            }
          }
        };

        // Try immediately
        syncDatePickers();

        // Retry after short delay in case DatePickers aren't ready yet
        setTimeout(syncDatePickers, 100);
        setTimeout(syncDatePickers, 300);
      }
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
    const hiddenInput = this.baseInput;
    const options = this.queryAllOptions();
    options.forEach((option) => {
      option.classList.remove("pb_dropdown_option_selected");
      option.style.display = "";
    });

    hiddenInput.value = "";

    const defaultPlaceholder = this.placeholder;
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

    const wrapper = this.element.querySelector('[data-dropdown-pills-wrapper]');
    const placeholder = this.element.querySelector(
      '[data-dropdown-trigger-display-multi-select]',
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
      pill.classList.add(
        "pb_form_pill_kit",
        `pb_form_pill_${color}`,
        "pb_form_pill_none",
        "mr_xs",
      );
      if (this.formPillProps.size === "small") {
        pill.classList.add("pb_form_pill_small");
      }
      pill.tabIndex = 0;
      pill.dataset.pillId = JSON.parse(option).id;
      const innerDiv = document.createElement("h3");
      innerDiv.className = "pb_title_kit pb_title_4 pb_form_pill_text";
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

        const optEl = (this.target || this.element).querySelector(
          `${OPTION_SELECTOR}[data-dropdown-option-label*='"id":${JSON.stringify(
            id,
          )}']`,
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
    if (this.isDisabled) return;
    if (this.isMultiSelect) {
      this.selectedOptions.clear();
      this.queryAllOptions().forEach((opt) => {
        opt.style.display = "";
      });
      if (this.target.classList.contains("open")) {
        this.showElement(this.target);
      }
    }
    const customDisplay = this.element.querySelector(
      '[data-dropdown-trigger-custom-display]',
    );
    if (customDisplay) {
      customDisplay.style.display = "none";
    }

    // Clear quickpick hidden inputs
    const startDateId = this.element.dataset.startDateId;
    const endDateId = this.element.dataset.endDateId;
    const controlsStartId = this.element.dataset.controlsStartId;
    const controlsEndId = this.element.dataset.controlsEndId;

    if (startDateId) {
      const startDateInput = document.getElementById(startDateId);
      if (startDateInput) startDateInput.value = "";
    }
    if (endDateId) {
      const endDateInput = document.getElementById(endDateId);
      if (endDateInput) endDateInput.value = "";
    }

    // Clear linked DatePickers if controlsStartId/controlsEndId are present
    if (controlsStartId) {
      const startPicker = document.querySelector(
        `#${controlsStartId}`,
      )?._flatpickr;
      if (startPicker) {
        startPicker.clear();
      }
    }

    if (controlsEndId) {
      const endPicker = document.querySelector(`#${controlsEndId}`)?._flatpickr;
      if (endPicker) {
        endPicker.clear();
      }
    }

    this.resetDropdownValue();
    this.updatePills();
    this.updateClearButton();
    this.syncHiddenInputs();
    this.emitSelectionChange();
  }

  // Method for DatePicker sync - only clears the dropdown, not the DatePickers
  clearSelected() {
    // Only clear if this is a single-select quickpick variant
    if (
      this.element.dataset.pbDropdownVariant !== "quickpick" ||
      this.isMultiSelect
    ) {
      return;
    }

    const customDisplay = this.element.querySelector(
      '[data-dropdown-trigger-custom-display]',
    );
    if (customDisplay) {
      customDisplay.style.display = "none";
    }

    // Clear quickpick hidden inputs only (not the DatePickers)
    const startDateId = this.element.dataset.startDateId;
    const endDateId = this.element.dataset.endDateId;

    if (startDateId) {
      const startDateInput = document.getElementById(startDateId);
      if (startDateInput) startDateInput.value = "";
    }
    if (endDateId) {
      const endDateInput = document.getElementById(endDateId);
      if (endDateInput) endDateInput.value = "";
    }

    this.resetDropdownValue();
    this.updateClearButton();
    this.emitSelectionChange();
  }

  syncHiddenInputs() {
    if (!this.isMultiSelect) return;
    this.element
      .querySelectorAll('input[data-generated="true"]')
      .forEach((n) => n.remove());

    const baseInput = this.baseInput;
    if (!baseInput) return;
    // for multi_select, for each selectedOption, create a hidden input
    const name = baseInput.getAttribute("name");
    this.selectedOptions.forEach((raw) => {
      const optionData = JSON.parse(raw);
      // Use id if available, otherwise fall back to value
      const id = optionData.id || optionData.value;
      const inp = document.createElement("input");
      inp.type = "hidden";
      inp.name = name;
      inp.value = id;
      inp.dataset.generated = "true";
      baseInput.insertAdjacentElement("afterend", inp);
    });

    // For multi-select, remove required from base input when there are selections
    // The generated inputs handle the form submission with actual values
    // Restore required attribute when there are no selections (if it was originally required)
    if (this.selectedOptions.size > 0) {
      baseInput.value = "";
      baseInput.removeAttribute("required");
    } else {
      baseInput.value = "";
      if (this.wasOriginallyRequired) {
        baseInput.setAttribute("required", "");
      }
    }
  }

  handleBackspaceClear() {
    if (!this.isMultiSelect) {
      this.queryAllOptions().forEach((opt) => {
        opt.classList.remove("pb_dropdown_option_selected");
        opt.style.display = "";
        this.adjustDropdownHeight();
      });

      const hiddenInput = this.baseInput;
      if (hiddenInput) hiddenInput.value = "";

      const placeholder = this.placeholder;
      if (placeholder)
        this.setTriggerElementText(placeholder.dataset.dropdownPlaceholder);
    }
    if (this.isMultiSelect) {
      this.queryAllOptions().forEach((opt) => {
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
