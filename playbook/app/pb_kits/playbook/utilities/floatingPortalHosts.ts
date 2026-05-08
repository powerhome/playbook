/**
 * Portal host resolution for Typeahead (react-select) when menus render outside
 * overflow/scroll regions (e.g. inside Dialog or Filter Popover).
 *
 * This module will be extended when wiring Dropdown, DatePicker, MultiLevelSelect, and TimePicker
 */

/** Prefer mounting here (sibling to scroll region) so menus are not clipped. */
export const PB_DIALOG_FLOATING_ROOT_SELECTOR = "[data-pb-dialog-floating-root]"

export function resolveDialogFloatingPortalHost(
  fromElement: Element | null | undefined,
): HTMLElement | null {
  const dialogEl = fromElement?.closest("dialog")
  if (dialogEl) {
    return (
      dialogEl.querySelector<HTMLElement>(PB_DIALOG_FLOATING_ROOT_SELECTOR) ??
      dialogEl
    )
  }
  // react-modal (Playbook React Dialog) uses a div.pb_dialog, not a native <dialog> element.
  const reactModalShell = fromElement?.closest(".pb_dialog")
  if (reactModalShell) {
    return (
      reactModalShell.querySelector<HTMLElement>(PB_DIALOG_FLOATING_ROOT_SELECTOR) ??
      (reactModalShell as HTMLElement)
    )
  }
  const popoverEl = fromElement?.closest(".pb_popover_tooltip")
  if (popoverEl) {
    return (
      popoverEl.querySelector<HTMLElement>(PB_DIALOG_FLOATING_ROOT_SELECTOR) ??
      (popoverEl as HTMLElement)
    )
  }
  return null
}

/**
 * Host for react-select (Typeahead) `menuPortalTarget`.
 *
 * Popper applies `transform` to the popover root. A `position: fixed` menu that is portaled
 * *inside* that subtree is positioned against the transformed ancestor, not the viewport, so
 * react-select's menu coordinates (from the control's getBoundingClientRect) no longer match
 * — the menu appears shifted (often to the bottom/right of the popover).
 *
 * For kits inside `.pb_popover_tooltip`, portal menus to `document.body` so fixed positioning
 * matches viewport math. Native `<dialog>` / React Modal still use the floating root or context.
 */
export function resolveTypeaheadMenuPortalHost(
  kitRoot: HTMLElement | null | undefined,
  dialogCtxTarget: HTMLElement | null | undefined,
): HTMLElement | null {
  if (typeof document === "undefined") return null

  if (kitRoot?.closest(".pb_popover_tooltip")) {
    return document.body
  }

  return (
    resolveDialogFloatingPortalHost(kitRoot) ?? dialogCtxTarget ?? null
  )
}

/** Above popover ($z_9), dialogs ($z_10), below $z_max. */
export const PB_FLOATING_UI_Z_INDEX = "100100"

/** Kits that portal menus to `document.body` still belong to the open popover for close-on-click. */
export function targetIsInsidePortaledFloatingKit(target: HTMLElement): boolean {
  return target.closest(".typeahead-kit-select__menu-portal") !== null
}
