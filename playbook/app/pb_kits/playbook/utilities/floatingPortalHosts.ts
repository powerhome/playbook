/**
 * Portal host resolution and positioning for kits whose floating UI (menus, panels)
 * renders outside overflow/scroll regions (Dialog, Filter Popover, React Modal).
 *
 * Used by Typeahead, Dropdown, MultiLevelSelect; extend for DatePicker & TimePicker as needed.
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
 * Portal host for Typeahead `menuPortalTarget`, Dropdown / MultiLevelSelect portaled shells, etc.
 *
 * Popper applies `transform` to the popover root. A `position: fixed` menu portaled *inside*
 * that subtree is positioned against the transformed ancestor, not the viewport — so for
 * `.pb_popover_tooltip` we use `document.body`. Native `<dialog>` / React Modal use the
 * floating root or `dialogCtx.selectMenuPortalTarget`.
 */
export function resolvePortaledKitHost(
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

/** Use instead of `=== document.body` (iframes / identity quirks). */
export function isPortalCoordinateRootBody(el: Element | null | undefined): boolean {
  return el != null && el.nodeName === "BODY"
}

export function positionFloatingShellToInput(args: {
  shell: HTMLElement
  inputViewportRect: DOMRectReadOnly
  menuEl?: HTMLElement | null
  maxMenuHeightPx: number
  positionHost?: HTMLElement | null
  styleTarget?: HTMLElement | null
}): void {
  const { shell, inputViewportRect, menuEl, maxMenuHeightPx, positionHost, styleTarget } = args
  const coordHost = positionHost ?? shell.parentElement
  if (!coordHost) return

  const box = styleTarget ?? shell

  box.style.margin = "0"
  box.style.padding = "0"
  box.style.pointerEvents = "auto"
  box.style.zIndex = PB_FLOATING_UI_Z_INDEX
  box.style.width = `${Math.round(inputViewportRect.width)}px`

  if (isPortalCoordinateRootBody(coordHost)) {
    box.style.position = "fixed"
    box.style.left = `${Math.round(inputViewportRect.left)}px`
    box.style.top = `${Math.round(inputViewportRect.bottom + 4)}px`
  } else {
    const hr = coordHost.getBoundingClientRect()
    box.style.position = "absolute"
    box.style.left = `${Math.round(inputViewportRect.left - hr.left)}px`
    box.style.top = `${Math.round(inputViewportRect.bottom - hr.top + 4)}px`
  }

  if (menuEl) {
    const mh = Math.round(maxMenuHeightPx)
    menuEl.style.maxHeight = `${mh}px`
    menuEl.style.overflow = "auto"
  }
}

export function positionDropdownPortalToWrapper(args: {
  panel: HTMLElement
  wrapperViewportRect: DOMRectReadOnly
  positionHost: HTMLElement
  marginPx?: number
  matchWrapperWidth?: boolean
}): void {
  const margin = args.marginPx ?? 5
  const matchWrapperWidth = args.matchWrapperWidth ?? true
  const { panel, wrapperViewportRect: wr, positionHost } = args

  const h =
    panel.getBoundingClientRect().height ||
    panel.scrollHeight ||
    0

  const spaceBelow = window.innerHeight - wr.bottom
  const spaceAbove = wr.top

  let topPx: number
  if (h > 0 && spaceBelow < h + 10 && spaceAbove >= h + 10) {
    topPx = wr.top - h - margin
  } else {
    topPx = wr.bottom + margin
  }

  panel.style.margin = "0"
  panel.style.pointerEvents = "auto"
  panel.style.zIndex = PB_FLOATING_UI_Z_INDEX
  if (matchWrapperWidth) {
    panel.style.width = `${Math.round(wr.width)}px`
  } else {
    panel.style.removeProperty("width")
  }

  if (isPortalCoordinateRootBody(positionHost)) {
    panel.style.position = "fixed"
    panel.style.left = `${Math.round(wr.left)}px`
    panel.style.top = `${Math.round(topPx)}px`
  } else {
    const hr = positionHost.getBoundingClientRect()
    panel.style.position = "absolute"
    panel.style.left = `${Math.round(wr.left - hr.left)}px`
    panel.style.top = `${Math.round(topPx - hr.top)}px`
  }
}


/** Kits that portal menus to `document.body` still belong to the open popover for close-on-click. */
export function targetIsInsidePortaledFloatingKit(target: HTMLElement): boolean {
  return (
    target.closest(".typeahead-kit-select__menu-portal") !== null ||
    target.closest(".pb_multi_level_select_floating_shell") !== null ||
    target.closest(".pb_dropdown_floating_shell") !== null ||
    target.closest(".pb_dropdown_container") !== null
  )
}
