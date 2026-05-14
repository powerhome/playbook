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
 * The tooltip uses pb_popover's CSS classes for visual consistency, but is
 * teleported to <body> at connect() time so it escapes the filter row's
 * `overflow-x: auto` clipping context. We don't delegate to pb_popover here
 * because that kit doesn't portal its tooltip out of its DOM parent.
 */
export default class PbFilter extends PbEnhancedElement {
  _popper: PopperInstance | null = null;
  _picker: any = null;
  _tooltip: HTMLElement | null = null;
  _bodyClickHandler: ((e: MouseEvent) => void) | null = null;
  _optionClickHandler: ((e: MouseEvent) => void) | null = null;
  _isOpen = false;

  // Cached dataset reads — chip data attributes are stable for the
  // lifetime of the element, so resolve them once.
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

    // Teleport tooltip to <body> immediately. pb_popover_tooltip uses
    // visibility:hidden (not display:none), so leaving it inline would add
    // height to the filter row before the user has even interacted.
    const tooltip = this.tooltip;
    if (tooltip && tooltip.parentElement !== document.body) {
      document.body.appendChild(tooltip);
    }

    if (this._type === "select" || this._type === "dropdown") {
      this.bindOptionClicks();
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

    if (this._optionClickHandler && this._tooltip) {
      this._tooltip.removeEventListener("click", this._optionClickHandler);
      this._optionClickHandler = null;
    }

    if (this._tooltip && this._tooltip.parentElement === document.body) {
      this._tooltip.remove();
    }
    this._tooltip = null;
  }

  /* ---------------- show / hide ---------------- */

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

    // Defer until after the click that opened us has finished propagating,
    // so we don't immediately close ourselves.
    setTimeout(() => {
      if (this._bodyClickHandler) {
        document.addEventListener("click", this._bodyClickHandler, true);
      }
    }, 0);
  }

  /* ---------------- select / dropdown ---------------- */

  bindOptionClicks() {
    const tooltip = this.tooltip;
    if (!tooltip) return;

    this._optionClickHandler = (event: MouseEvent) => {
      const option = (event.target as HTMLElement).closest(
        "[data-pb-filter-option-value]"
      ) as HTMLElement | null;
      if (!option) return;

      const value = option.dataset.pbFilterOptionValue;
      const label = option.dataset.pbFilterOptionLabel || value;
      if (value === undefined) return;

      this.applyChange(value, label as string);
      this.hide();
    };
    tooltip.addEventListener("click", this._optionClickHandler);
  }

  /* ---------------- date-picker ---------------- */

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

  /* ---------------- shared ---------------- */

  applyChange(value: string, label: string) {
    const display = this.element.querySelector(
      "[data-pb-filter-value-display]"
    ) as HTMLElement | null;
    if (display) display.textContent = label || "—";

    this.element.dataset.pbFilterValue = value;

    if (!this._targetInputId) return;

    const input = document.getElementById(this._targetInputId) as
      | HTMLInputElement
      | HTMLSelectElement
      | null;
    if (!input) {
      console.warn(
        `[PbFilter] target_input "${this._targetInputId}" not found in the DOM — verify the ID matches a form field.`
      );
      return;
    }

    input.value = value;
    input.dispatchEvent(new Event("change", { bubbles: true }));

    // If the input is itself a flatpickr-enhanced field, sync its picker UI.
    const fpHost = input as HTMLInputElement & { _flatpickr?: any };
    if (fpHost._flatpickr?.setDate) {
      fpHost._flatpickr.setDate(value, false);
    }

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
