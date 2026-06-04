// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import PbEnhancedElement from "../pb_enhanced_element";
import { createPopper, Instance as PopperInstance } from "@popperjs/core";
import flatpickr from "flatpickr";

const INTERACTIVE_FILTER_SELECTOR = "[data-pb-interactive-filter]";

/**
 * Rails-side enhanced behavior for interactive applied-filter chips.
 *
 * The chip <button> is the trigger; this class owns:
 *   - click → popover open/close + popper positioning
 *   - option-click handling (select/dropdown editors)
 *   - flatpickr initialization (date-picker editor)
 *   - syncing the chosen value back to a target form input
 *   - optional auto-submit of the parent form
 *
 * The tooltip is teleported to <body> at connect() so it escapes the filter
 * row's overflow clipping (see _filter.scss for position:fixed).
 */
export default class PbFilter extends PbEnhancedElement {
  _popper: PopperInstance | null = null;
  _picker: any = null;
  _tooltip: HTMLElement | null = null;
  _bodyClickHandler: ((e: MouseEvent) => void) | null = null;
  _optionClickHandler: ((e: MouseEvent) => void) | null = null;
  _isOpen = false;

  _type: string | undefined;
  _popoverId: string | undefined;
  _targetInputId: string | undefined;
  _autoSubmit = false;

  static get selector() {
    return INTERACTIVE_FILTER_SELECTOR;
  }

  connect() {
    const { dataset } = this.element;
    this._type = dataset.pbFilterType;
    this._popoverId = dataset.pbFilterPopoverId;
    this._targetInputId = dataset.pbFilterTarget;
    this._autoSubmit = dataset.pbFilterAutoSubmit === "true";

    this.element.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.toggle();
    });

    if (this._type === "select" || this._type === "dropdown") {
      this.bindOptionClicks();
    }

    const tooltip = this.tooltip;
    if (tooltip && tooltip.parentElement !== document.body) {
      document.body.appendChild(tooltip);
      tooltip.style.position = "fixed";
      tooltip.style.top = "0";
      tooltip.style.left = "0";
      tooltip.style.margin = "0";
    }
  }

  disconnect() {
    this._popper?.destroy();
    this._popper = null;

    this._picker?.destroy();
    this._picker = null;

    if (this._bodyClickHandler) {
      document.removeEventListener("click", this._bodyClickHandler, true);
      this._bodyClickHandler = null;
    }

    if (this._optionClickHandler) {
      document.removeEventListener("click", this._optionClickHandler);
      this._optionClickHandler = null;
    }

    if (this._tooltip && this._tooltip.parentElement === document.body) {
      this._tooltip.remove();
    }
    this._tooltip = null;
  }

  get tooltip(): HTMLElement | null {
    if (this._tooltip) return this._tooltip;
    if (!this._popoverId) return null;
    this._tooltip = document.getElementById(this._popoverId);
    return this._tooltip;
  }

  toggle() {
    this._isOpen ? this.hide() : this.show();
  }

  show() {
    const tooltip = this.tooltip;
    if (!tooltip) return;

    if (tooltip.parentElement !== document.body) {
      document.body.appendChild(tooltip);
      tooltip.style.position = "fixed";
      tooltip.style.top = "0";
      tooltip.style.left = "0";
      tooltip.style.margin = "0";
    }

    tooltip.classList.remove("hide");
    tooltip.classList.add("show");
    this._isOpen = true;

    if (!this._popper) {
      this._popper = createPopper(this.element, tooltip, {
        placement: "bottom-start",
        strategy: "fixed",
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      });
    } else {
      this._popper.update();
    }

    if (this._type === "date-picker" && !this._picker) {
      this.initFlatpickr();
    }

    this.bindBodyClickToClose();
  }

  hide() {
    const tooltip = this.tooltip;
    if (!tooltip) return;
    tooltip.classList.remove("show");
    tooltip.classList.add("hide");
    this._isOpen = false;

    if (this._bodyClickHandler) {
      document.removeEventListener("click", this._bodyClickHandler, true);
      this._bodyClickHandler = null;
    }
  }

  bindBodyClickToClose() {
    if (this._bodyClickHandler) return;

    this._bodyClickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (this.element.contains(target)) return;
      if (this.tooltip && this.tooltip.contains(target)) return;
      this.hide();
    };

    setTimeout(() => {
      if (this._bodyClickHandler) {
        document.addEventListener("click", this._bodyClickHandler, true);
      }
    }, 0);
  }

  bindOptionClicks() {
    if (this._optionClickHandler || !this._popoverId) return;

    const popoverId = this._popoverId;

    this._optionClickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const option = target.closest(
        "[data-pb-filter-option-value]"
      ) as HTMLElement | null;
      if (!option) return;

      const popover = document.getElementById(popoverId);
      if (!popover || !popover.contains(option)) return;

      const value = option.dataset.pbFilterOptionValue;
      const label = option.dataset.pbFilterOptionLabel || value;
      if (value === undefined) return;

      this.applyChange(value, label);
      this.hide();
    };

    document.addEventListener("click", this._optionClickHandler);
  }

  initFlatpickr() {
    const tooltip = this.tooltip;
    if (!tooltip) return;
    const mount = tooltip.querySelector(
      "[data-pb-filter-date-mount]"
    ) as HTMLElement | null;
    if (!mount) return;

    const { dataset } = this.element;
    const mode = (dataset.pbFilterDateMode || "single") as
      | "single"
      | "range"
      | "multiple";

    this._picker = flatpickr(mount, {
      inline: true,
      defaultDate: dataset.pbFilterValue || undefined,
      mode,
      dateFormat: dataset.pbFilterDateFormat || "m/d/Y",
      minDate: dataset.pbFilterDateMin || undefined,
      maxDate: dataset.pbFilterDateMax || undefined,
      nextArrow: '<i class="far fa-angle-right"></i>',
      prevArrow: '<i class="far fa-angle-left"></i>',
      onChange: (_dates: Date[], dateStr: string) => {
        this.applyChange(dateStr, dateStr);
        if (mode === "single") this.hide();
      },
    });
  }

  applyChange(value: string, label: string) {
    const display = this.element.querySelector(
      "[data-pb-filter-value-display]"
    ) as HTMLElement | null;
    if (display) display.textContent = label || "—";

    this.element.dataset.pbFilterValue = value;
    this.updateChipOptionActiveStates(value);

    if (!this._targetInputId) return;

    const target = document.getElementById(this._targetInputId) as
      | HTMLElement
      | null;
    if (!target) {
      console.warn(
        `[PbFilter] target_input "${this._targetInputId}" not found in the DOM — verify the ID matches a form field or dropdown.`
      );
      return;
    }

    const syncTarget =
      this._type === "dropdown"
        ? this.resolveDropdownRoot(target) || target
        : target;

    if (this.syncDropdownTarget(syncTarget, value)) {
      if (this._autoSubmit) this.maybeAutoSubmit(target);
      return;
    }

    const input = target as HTMLInputElement | HTMLSelectElement;
    input.value = value;
    input.dispatchEvent(new Event("change", { bubbles: true }));

    const fpHost = input as HTMLInputElement & { _flatpickr?: any };
    if (fpHost._flatpickr?.setDate) {
      fpHost._flatpickr.setDate(value, false);
    }

    if (this._autoSubmit) this.maybeAutoSubmit(input);
  }

  updateChipOptionActiveStates(value: string) {
    const tooltip = this.tooltip;
    if (!tooltip) return;

    tooltip
      .querySelectorAll("[data-pb-filter-option-value]")
      .forEach((optionEl) => {
        const option = optionEl as HTMLElement;
        const isActive = option.dataset.pbFilterOptionValue === value;
        option.classList.toggle("active", isActive);
        option.setAttribute("aria-selected", String(isActive));

        const checkIcon = option.querySelector(
          ".pb_icon_kit, .pb_icon_kit_xs, [class*='fa-check']"
        );
        if (isActive && !checkIcon) {
          const icon = document.createElement("i");
          icon.className = "far fa-check fa-fw fa-xs";
          option.appendChild(icon);
        } else if (!isActive && checkIcon) {
          checkIcon.remove();
        }
      });
  }

  resolveDropdownRoot(target: HTMLElement): HTMLElement | null {
    if (target.matches("[data-pb-dropdown]")) return target;
    return target.closest("[data-pb-dropdown]") as HTMLElement | null;
  }

  syncDropdownTarget(target: HTMLElement, value: string): boolean {
    const dropdownRoot = this.resolveDropdownRoot(target);
    if (!dropdownRoot) return false;

    const dropdownId = dropdownRoot.id;
    const applySelection = () => {
      const instance = (
        dropdownRoot as HTMLElement & {
          _pbDropdownInstance?: {
            setSelectionByOptionId: (id: string) => void,
          },
        }
      )._pbDropdownInstance;

      if (instance?.setSelectionByOptionId) {
        instance.setSelectionByOptionId(value);
        return true;
      }
      return false;
    };

    if (!applySelection() && dropdownId) {
      document.dispatchEvent(
        new CustomEvent("pb:dropdown:select", {
          detail: { dropdownId, optionId: value },
        })
      );
    }

    if (!applySelection()) {
      requestAnimationFrame(() => applySelection());
    }

    const hiddenInput = dropdownRoot.querySelector(
      "[data-dropdown-selected-option]"
    ) as HTMLInputElement | null;
    if (hiddenInput && hiddenInput.value !== value) {
      hiddenInput.value = value;
    }
    hiddenInput?.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  maybeAutoSubmit(input: HTMLElement) {
    if (!this._autoSubmit) return;

    const form = input.closest("form");
    if (form) {
      form.requestSubmit();
    } else {
      console.warn(
        "[PbFilter] auto_submit: no <form> ancestor found for target input",
        input,
        "— verify target_input points to a field inside a <form> element."
      );
    }
  }
}
