// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import PbEnhancedElement from "../pb_enhanced_element";
import { createPopper, Instance as PopperInstance } from "@popperjs/core";
import flatpickr from "flatpickr";


const INTERACTIVE_FILTER_SELECTOR = "[data-pb-interactive-filter]";

/**
 * Rails-side enhanced behavior for interactive applied-filter chips.
 *
 * The chip button is the trigger; this class owns the click → popover open
 * + positioning, option-click handling, and (for date-picker editors)
 * flatpickr initialization. We do not delegate to pb_popover for chip
 * clicks because the popover tooltip is rendered inside the filter row
 * which has `overflow-x: auto`/`overflow-x: hidden` — pb_popover would
 * keep the tooltip inside that overflow context and clip it. Here we move
 * the tooltip to document.body on first open and use popper.js (already a
 * dependency) to position it against the chip.
 */
export default class PbFilter extends PbEnhancedElement {
  _popper: PopperInstance | null = null;
  _picker: any = null;
  _tooltip: HTMLElement | null = null;
  _bodyClickHandler: ((e: MouseEvent) => void) | null = null;
  _isOpen = false;

  static get selector() {
    return INTERACTIVE_FILTER_SELECTOR;
  }

  connect() {
    this.element.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });

    const type = this.element.dataset.pbFilterType;
    if (type === "select" || type === "dropdown") {
      this.bindOptionClicks();
    }

    // Teleport the tooltip to <body> immediately so it never contributes to
    // the filter row's height (pb_popover_tooltip uses visibility:hidden, not
    // display:none, so it still occupies space while inline).
    const tooltip = this.tooltip;
    if (tooltip && tooltip.parentElement !== document.body) {
      document.body.appendChild(tooltip);
    }
  }

  disconnect() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
    if (this._picker) {
      this._picker.destroy();
      this._picker = null;
    }
    if (this._bodyClickHandler) {
      document.removeEventListener("click", this._bodyClickHandler, true);
      this._bodyClickHandler = null;
    }
    // Tooltip was moved to body on first open — orphan-cleanup
    if (this._tooltip && this._tooltip.parentElement === document.body) {
      this._tooltip.remove();
    }
    this._tooltip = null;
  }

  /* ---------------- show / hide ---------------- */

  get tooltip(): HTMLElement | null {
    if (this._tooltip) return this._tooltip;
    const id = this.element.dataset.pbFilterPopoverId;
    if (!id) return null;
    this._tooltip = document.getElementById(id);
    return this._tooltip;
  }

  toggle() {
    if (this._isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    const tooltip = this.tooltip;
    if (!tooltip) return;

    // Move the tooltip out of the filter row (escapes overflow clipping)
    if (tooltip.parentElement !== document.body) {
      document.body.appendChild(tooltip);
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

    // Init date picker now that the calendar mount is visible
    const type = this.element.dataset.pbFilterType;
    if (type === "date-picker" && !this._picker) {
      this.initFlatpickr();
    }

    // Body-click-to-close
    if (!this._bodyClickHandler) {
      this._bodyClickHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (this.element.contains(target)) return;
        if (this.tooltip && this.tooltip.contains(target)) return;
        this.hide();
      };
      // Defer until after the current click finishes propagating, so the
      // very click that opened us doesn't immediately close us.
      setTimeout(() => {
        if (this._bodyClickHandler) {
          document.addEventListener("click", this._bodyClickHandler, true);
        }
      }, 0);
    }
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

  /* ---------------- select / dropdown ---------------- */

  bindOptionClicks() {
    const popoverId = this.element.dataset.pbFilterPopoverId;
    if (!popoverId) return;

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const option = target.closest(
        `#${popoverId} [data-pb-filter-option-value]`
      ) as HTMLElement | null;
      if (!option) return;

      const value = option.dataset.pbFilterOptionValue;
      const label = option.dataset.pbFilterOptionLabel || value;
      if (value === undefined) return;

      this.applyChange(value, label);
      this.hide();
    });
  }

  /* ---------------- date-picker ---------------- */

  initFlatpickr() {
    const tooltip = this.tooltip;
    if (!tooltip) return;
    const mount = tooltip.querySelector(
      "[data-pb-filter-date-mount]"
    ) as HTMLElement | null;
    if (!mount) return;

    const format = this.element.dataset.pbFilterDateFormat || "m/d/Y";
    const mode =
      (this.element.dataset.pbFilterDateMode as
        | "single"
        | "range"
        | "multiple") || "single";
    const minDate = this.element.dataset.pbFilterDateMin || undefined;
    const maxDate = this.element.dataset.pbFilterDateMax || undefined;
    const defaultDate = this.element.dataset.pbFilterValue || undefined;

    this._picker = flatpickr(mount, {
      inline: true,
      defaultDate,
      mode,
      dateFormat: format,
      minDate,
      maxDate,
      nextArrow: '<i class="far fa-angle-right"></i>',
      prevArrow: '<i class="far fa-angle-left"></i>',
      onChange: (_selectedDates: Date[], dateStr: string) => {
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

    const targetId = this.element.dataset.pbFilterTarget;
    if (targetId) {
      const input = document.getElementById(targetId) as
        | HTMLInputElement
        | HTMLSelectElement
        | null;
      if (input) {
        input.value = value;
        input.dispatchEvent(new Event("change", { bubbles: true }));
        const fpHost = input as HTMLInputElement & { _flatpickr?: any };
        if (
          fpHost._flatpickr &&
          typeof fpHost._flatpickr.setDate === "function"
        ) {
          fpHost._flatpickr.setDate(value, false);
        }
      }
    }
  }
}
