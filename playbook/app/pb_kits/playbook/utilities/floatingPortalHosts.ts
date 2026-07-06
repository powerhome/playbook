/**
 * Portal host resolution and positioning for kits whose floating UI (menus, panels)
 * renders outside overflow/scroll regions (Dialog, Filter Popover, React Modal).
 *
 * Used by Typeahead, Dropdown, MultiLevelSelect, DatePicker, and TimePicker.
 */

/** Prefer mounting here (sibling to scroll region) so menus are not clipped. */
export const PB_DIALOG_FLOATING_ROOT_SELECTOR = "[data-pb-dialog-floating-root]"

/** Scopes portaled menus to the Dialog / Filter popover that opened them (close-on-click). */
export const PB_FLOATING_OWNER_ATTR = "data-pb-floating-owner"

/** Direct-child floating root on dialog / React modal shells (excludes nested `<dialog>` roots). */
const DIALOG_DIRECT_FLOATING_ROOT = `:scope > ${PB_DIALOG_FLOATING_ROOT_SELECTOR}`

/** Popover floating root lives under `.pb_popover_body`, not on the tooltip root. */
const POPOVER_FLOATING_ROOT = `:scope > .pb_popover_body > ${PB_DIALOG_FLOATING_ROOT_SELECTOR}`

export function resolveDialogFloatingPortalHost(
  fromElement: Element | null | undefined,
): HTMLElement | null {
  const dialogEl = fromElement?.closest("dialog")
  if (dialogEl) {
    return (
      dialogEl.querySelector<HTMLElement>(DIALOG_DIRECT_FLOATING_ROOT) ??
      dialogEl
    )
  }
  // react-modal (Playbook React Dialog) uses a div.pb_dialog, not a native <dialog> element.
  const reactModalShell = fromElement?.closest(".pb_dialog")
  if (reactModalShell) {
    return (
      reactModalShell.querySelector<HTMLElement>(DIALOG_DIRECT_FLOATING_ROOT) ??
      (reactModalShell as HTMLElement)
    )
  }
  const popoverEl = fromElement?.closest(".pb_popover_tooltip")
  if (popoverEl) {
    return (
      popoverEl.querySelector<HTMLElement>(POPOVER_FLOATING_ROOT) ??
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

/** True when the kit may need a portaled menu (dialog / filter popover). Cheap `closest` only to skip on plain forms */
export function kitRequiresPortaledFloatingUi(
  kitRoot: HTMLElement | null | undefined,
): boolean {
  if (!kitRoot) return false
  return (
    kitRoot.closest(".pb_popover_tooltip") !== null ||
    kitRoot.closest("dialog") !== null ||
    kitRoot.closest(".pb_dialog") !== null
  )
}

/** Owner id for portaled menus (filter tooltip id, dialog id, React popover targetId) - explicit `data-pb-floating-owner` on the floating root / popover surface */
export function resolveFloatingOwnerId(
  kitRoot: HTMLElement | null | undefined,
): string | null {
  if (!kitRoot) return null

  const marked = kitRoot.closest(`[${PB_FLOATING_OWNER_ATTR}]`)
  if (marked) {
    return marked.getAttribute(PB_FLOATING_OWNER_ATTR)
  }

  const popoverTooltip = kitRoot.closest(".pb_popover_tooltip")
  if (popoverTooltip?.id) {
    return popoverTooltip.id
  }

  const dialogShell = kitRoot.closest("dialog, .pb_dialog")
  if (dialogShell?.id) {
    return dialogShell.id
  }

  return null
}

export function setFloatingOwnerAttribute(
  element: HTMLElement | null | undefined,
  ownerId: string | null | undefined,
): void {
  if (!element) return
  if (ownerId) {
    element.setAttribute(PB_FLOATING_OWNER_ATTR, ownerId)
  } else {
    element.removeAttribute(PB_FLOATING_OWNER_ATTR)
  }
}

function ownerScopeSelector(ownerId: string): string {
  return `[${PB_FLOATING_OWNER_ATTR}="${CSS.escape(ownerId)}"]`
}

function isPortaledFloatingMenuNode(target: HTMLElement): boolean {
  return (
    target.closest(".typeahead-kit-select__menu-portal") !== null ||
    target.closest(".pb_multi_level_select_floating_shell") !== null ||
    target.closest(".pb_dropdown_floating_shell") !== null ||
    target.closest(".pb_date_picker_floating_shell") !== null ||
    target.closest(".flatpickr-calendar") !== null ||
    target.closest(".pb_time_picker_floating_shell") !== null ||
    target.closest(".pb_time_picker_panel_portal") !== null ||
    target.closest(".pb_time_picker_container") !== null ||
    target.closest(".time_dropdown") !== null ||
    target.closest(".time_dropdown_option") !== null
  )
}

const PORTAL_OWNER_HIT_TEST_SELECTORS = [
  ".typeahead-kit-select__menu-portal",
  ".pb_multi_level_select_floating_shell",
  ".pb_dropdown_floating_shell",
  ".pb_date_picker_floating_shell",
  ".flatpickr-calendar",
  ".pb_time_picker_floating_shell",
  ".pb_time_picker_panel_portal",
  ".pb_time_picker_container",
  ".time_dropdown",
  ".time_dropdown_option",
].join(", ")

function pointInVisibleRect(
  x: number,
  y: number,
  rect: DOMRectReadOnly,
): boolean {
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  )
}

/** Bounding-rect hit test for portaled menus (fixed children can leave a 0×0 shell). */
export function portaledFloatingOwnerMenusAtPoint(
  x: number,
  y: number,
  ownerId: string,
): boolean {
  if (typeof document === "undefined") {
    return false
  }

  const roots = document.querySelectorAll<HTMLElement>(
    ownerScopeSelector(ownerId),
  )

  for (const root of roots) {
    if (
      root.classList.contains("pb_popover_tooltip") ||
      root.classList.contains("pb_popover_body") ||
      root.classList.contains("pb_popover_floating_root")
    ) {
      continue
    }

    const candidates: HTMLElement[] = [root]
    root
      .querySelectorAll<HTMLElement>(PORTAL_OWNER_HIT_TEST_SELECTORS)
      .forEach((node) => {
        candidates.push(node)
      })

    for (const node of candidates) {
      if (pointInVisibleRect(x, y, node.getBoundingClientRect())) {
        return true
      }
    }
  }

  return false
}

export function eventTargetAsElement(
  target: EventTarget | null,
): HTMLElement | null {
  if (!target) return null
  if (target instanceof HTMLElement) return target
  if (target instanceof Node) {
    return target.parentElement
  }
  return null
}

/**
 * Native `<select>` menus are OS-rendered (not in the DOM). Firefox may fire
 * mousedown on the dialog/backdrop while picking an option — treat focused or
 * in-dialog selects as an in-menu interaction so the dialog does not close.
 */
export function isNativeSelectMenuInteraction(
  dialogElement: HTMLElement,
  target: EventTarget | null,
): boolean {
  const el = eventTargetAsElement(target)
  const selectFromTarget =
    el instanceof HTMLSelectElement ? el : el?.closest("select") ?? null

  if (
    selectFromTarget instanceof HTMLSelectElement &&
    dialogElement.contains(selectFromTarget)
  ) {
    return true
  }

  const active = document.activeElement
  return (
    active instanceof HTMLSelectElement &&
    dialogElement.contains(active)
  )
}

/**
 * Kits that portal menus to `document.body` still belong to the open popover for close-on-click.
 * When `ownerId` is passed, only menus tagged for that surface count (not other open popovers).
 */
export function targetIsInsidePortaledFloatingKit(
  target: HTMLElement,
  ownerId?: string | null,
): boolean {
  if (!isPortaledFloatingMenuNode(target)) {
    return false
  }

  if (!ownerId) {
    return true
  }

  return target.closest(ownerScopeSelector(ownerId)) !== null
}

/** Hit-test the full stacking context stack (covers overflow / fixed descendants). */
export function portaledFloatingKitAtPoint(
  x: number,
  y: number,
  ownerId?: string | null,
): boolean {
  if (typeof document === "undefined") {
    return false
  }

  try {
    if (typeof document.elementsFromPoint === "function") {
      return document.elementsFromPoint(x, y).some((el) => {
        if (!(el instanceof HTMLElement)) return false
        return targetIsInsidePortaledFloatingKit(el, ownerId)
      })
    }

    if (typeof document.elementFromPoint === "function") {
      const el = document.elementFromPoint(x, y)
      return (
        el instanceof HTMLElement &&
        targetIsInsidePortaledFloatingKit(el, ownerId)
      )
    }
  } catch {
    return false
  }

  return false
}

type PortaledMenuPointerDown = {
  ownerId: string
  x: number
  y: number
  at: number
}

let portaledMenuPointerDown: PortaledMenuPointerDown | null = null

/** Record mousedown on a portaled menu so the following click still counts as in-menu. */
export function recordPortaledMenuPointerDown(
  ownerId: string,
  x: number,
  y: number,
): void {
  portaledMenuPointerDown = { ownerId, x, y, at: Date.now() }
}

export function matchesPortaledMenuPointerDown(
  ownerId: string,
  x: number,
  y: number,
  maxAgeMs = 750,
): boolean {
  const rec = portaledMenuPointerDown
  if (!rec || rec.ownerId !== ownerId) return false
  if (Date.now() - rec.at > maxAgeMs) return false
  return Math.abs(rec.x - x) <= 2 && Math.abs(rec.y - y) <= 2
}

export function isPortaledFloatingKitInteraction(
  target: EventTarget | null,
  ownerId?: string | null,
  clientX?: number,
  clientY?: number,
): boolean {
  const el = eventTargetAsElement(target)
  if (el && targetIsInsidePortaledFloatingKit(el, ownerId)) {
    return true
  }

  if (clientX == null || clientY == null) {
    return false
  }

  if (
    ownerId &&
    matchesPortaledMenuPointerDown(ownerId, clientX, clientY)
  ) {
    return true
  }

  if (ownerId && portaledFloatingOwnerMenusAtPoint(clientX, clientY, ownerId)) {
    return true
  }

  return portaledFloatingKitAtPoint(clientX, clientY, ownerId)
}

/**
 * Unified z-index for all portaled floating UI (filter popover on `document.body`
 * and dialog/modal floating roots). Above popover (900–1001), below typical app
 * nav (10010). Dialog menus only stack within the modal; the same cap applies.
 */
export const PB_PORTALED_FLOATING_Z_INDEX = "1002"
export const PB_PORTALED_FLOATING_Z_INDEX_MAX = 10009

let portaledFloatingZIndexSeq = Number(PB_PORTALED_FLOATING_Z_INDEX)

/** Monotonic z-index for any portaled menu/panel. Capped at 10009. */
export function nextPortaledFloatingZIndex(): string {
  portaledFloatingZIndexSeq = Math.min(
    portaledFloatingZIndexSeq + 1,
    PB_PORTALED_FLOATING_Z_INDEX_MAX,
  )
  return String(portaledFloatingZIndexSeq)
}

/** Caps any portaled host at 10009 (body and dialog use the same range). */
export function resolvePortaledFloatingZIndex(
  _portalHost: HTMLElement,
  preferred?: string,
): string {
  const z = Number(preferred ?? PB_PORTALED_FLOATING_Z_INDEX)
  return String(Math.min(z, PB_PORTALED_FLOATING_Z_INDEX_MAX))
}

export const PB_FLOATING_KIT_OPEN_EVENT = "pb-floating-kit-open"

export type FloatingKitOpenDetail = {
  kitKind: string
  ownerId?: string | null
}

export function announceFloatingKitOpen(
  kitKind: string,
  ownerId?: string | null,
): void {
  if (typeof document === "undefined") return
  document.dispatchEvent(
    new CustomEvent<FloatingKitOpenDetail>(PB_FLOATING_KIT_OPEN_EVENT, {
      detail: { kitKind, ownerId },
    }),
  )
}

export function subscribeFloatingKitOpen(
  handler: (detail: FloatingKitOpenDetail) => void,
): () => void {
  if (typeof document === "undefined") {
    return () => undefined
  }

  const listener = (event: Event) => {
    handler((event as CustomEvent<FloatingKitOpenDetail>).detail)
  }

  document.addEventListener(PB_FLOATING_KIT_OPEN_EVENT, listener)
  return () => document.removeEventListener(PB_FLOATING_KIT_OPEN_EVENT, listener)
}

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
  zIndex?: string
}): void {
  const { shell, inputViewportRect, menuEl, maxMenuHeightPx, positionHost, styleTarget } = args
  const coordHost = positionHost ?? shell.parentElement
  if (!coordHost) return

  const box = styleTarget ?? shell
  const coordTopPx = inputViewportRect.bottom + 4

  box.style.margin = "0"
  box.style.padding = "0"
  box.style.pointerEvents = "auto"
  box.style.zIndex = resolvePortaledFloatingZIndex(
    coordHost as HTMLElement,
    args.zIndex ?? PB_PORTALED_FLOATING_Z_INDEX,
  )
  box.style.width = `${Math.round(inputViewportRect.width)}px`

  if (isPortalCoordinateRootBody(coordHost)) {
    box.style.position = "fixed"
    box.style.left = `${Math.round(inputViewportRect.left)}px`
    box.style.top = `${Math.round(coordTopPx)}px`
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
  /** When true, always place below the wrapper (no flip above when panel is tall). */
  preferBelow?: boolean
  zIndex?: string
}): void {
  const margin = args.marginPx ?? 5
  const matchWrapperWidth = args.matchWrapperWidth ?? true
  const preferBelow = args.preferBelow ?? false
  const { panel, wrapperViewportRect: wr, positionHost } = args

  const h =
    panel.getBoundingClientRect().height ||
    panel.scrollHeight ||
    0

  const spaceBelow = window.innerHeight - wr.bottom
  const spaceAbove = wr.top

  let topPx: number
  if (
    !preferBelow &&
    h > 0 &&
    spaceBelow < h + 10 &&
    spaceAbove >= h + 10
  ) {
    topPx = wr.top - h - margin
  } else {
    topPx = wr.bottom + margin
  }

  panel.style.margin = "0"
  panel.style.pointerEvents = "auto"
  panel.style.zIndex = resolvePortaledFloatingZIndex(
    positionHost,
    args.zIndex ?? PB_PORTALED_FLOATING_Z_INDEX,
  )
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

/** Re-run positioning while a portaled menu is open for Dropdown and Multi Level Select. */
export function subscribeFloatingKitReposition(reposition: () => void): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => undefined
  }

  const scrollOpts: AddEventListenerOptions = { capture: true, passive: true }
  let rafId: number | null = null

  // Coalesce burst scroll/resize events to one layout read + style write per frame.
  const run = () => {
    if (rafId != null) return
    rafId = requestAnimationFrame(() => {
      rafId = null
      reposition()
    })
  }

  window.addEventListener("scroll", run, scrollOpts)
  document.addEventListener("scroll", run, scrollOpts)
  window.addEventListener("resize", run)

  const vv = window.visualViewport
  if (vv) {
    vv.addEventListener("scroll", run)
    vv.addEventListener("resize", run)
  }

  return () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    window.removeEventListener("scroll", run, scrollOpts)
    document.removeEventListener("scroll", run, scrollOpts)
    window.removeEventListener("resize", run)
    if (vv) {
      vv.removeEventListener("scroll", run)
      vv.removeEventListener("resize", run)
    }
  }
}
