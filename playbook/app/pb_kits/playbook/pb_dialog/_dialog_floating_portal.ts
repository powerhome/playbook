/**
 * Portal host resolution + positioning for floating kit UI (dropdowns, date picker, typeahead,
 * multi-level select, time picker) when they render outside overflow/scroll via portals.
 */

/** Prefer mounting here (sibling to scroll region) so menus are not clipped. */
export const PB_DIALOG_FLOATING_ROOT_SELECTOR = "[data-pb-dialog-floating-root]";

export function resolveDialogFloatingPortalHost(
  fromElement: Element | null | undefined,
): HTMLElement | null {
  const dialogEl = fromElement?.closest("dialog");
  if (dialogEl) {
    return (
      dialogEl.querySelector<HTMLElement>(PB_DIALOG_FLOATING_ROOT_SELECTOR) ??
      dialogEl
    );
  }
  // react-modal (Playbook React Dialog) uses a div.pb_dialog, not a native <dialog> element.
  const reactModalShell = fromElement?.closest(".pb_dialog");
  if (reactModalShell) {
    return (
      reactModalShell.querySelector<HTMLElement>(PB_DIALOG_FLOATING_ROOT_SELECTOR) ??
      (reactModalShell as HTMLElement)
    );
  }
  const popoverEl = fromElement?.closest(".pb_popover_tooltip");
  if (popoverEl) {
    return (
      popoverEl.querySelector<HTMLElement>(PB_DIALOG_FLOATING_ROOT_SELECTOR) ??
      (popoverEl as HTMLElement)
    );
  }
  return null;
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
  if (typeof document === "undefined") return null;

  if (kitRoot?.closest(".pb_popover_tooltip")) {
    return document.body;
  }

  return (
    resolveDialogFloatingPortalHost(kitRoot) ?? dialogCtxTarget ?? null
  );
}

/** Same host resolution as Typeahead, for custom portaled shells (e.g. MultiLevelSelect). */
export const resolvePortaledKitHost = resolveTypeaheadMenuPortalHost;

/** TimePicker: same host rules as Typeahead / dropdown / date picker. */
export const resolveTimePickerPortalHost = resolveTypeaheadMenuPortalHost;

/**
 * Portal root for floating kit UI.
 * - Native `<dialog>` / filter popover: prefer `[data-pb-dialog-floating-root]`.
 * - React Dialog: `dialogCtx.selectMenuPortalTarget` (typically the floating root node).
 * - Otherwise: `document.body` so menus escape clipped ancestors.
 */
export function resolveFloatingUIPortalHost(
  fromElement: Element | null | undefined,
  dialogCtxTarget: HTMLElement | null | undefined,
): HTMLElement | null {
  const fromDialogOrPopover = resolveDialogFloatingPortalHost(fromElement);
  if (fromDialogOrPopover) return fromDialogOrPopover;

  if (dialogCtxTarget) return dialogCtxTarget;

  if (typeof document === "undefined") return null;

  if (
    typeof globalThis !== "undefined" &&
    (globalThis as { __PLAYBOOK_KIT_TEST__?: boolean }).__PLAYBOOK_KIT_TEST__
  ) {
    return null;
  }

  if (
    typeof process !== "undefined" &&
    (process.env.NODE_ENV === "test" || process.env.JEST_WORKER_ID != null)
  ) {
    return null;
  }

  return document.body;
}

/** Above popover ($z_9), dialogs ($z_10), below $z_max. */
export const PB_FLOATING_UI_Z_INDEX = "100100";

/** Use instead of `=== document.body` (iframes / identity quirks). */
export function isPortalCoordinateRootBody(el: Element | null | undefined): boolean {
  return el != null && el.nodeName === "BODY";
}

export function positionFloatingShellToInput(args: {
  shell: HTMLElement;
  inputViewportRect: DOMRectReadOnly;
  /** Scrollable menu region; if omitted, max-height is not applied (caller may retry). */
  menuEl?: HTMLElement | null;
  maxMenuHeightPx: number;
  /**
   * Element used for coordinate math (floating root, `document.body`, etc.). Defaults to
   * `shell.parentElement`, which is wrong when an extra mount wrapper sits between the shell and
   * the portal host — pass the same node you portal into.
   */
  positionHost?: HTMLElement | null;
  /**
   * Node that receives position/left/top/z-index/width. Use the stable portal mount wrapper when
   * the shell is recreated by `ReactDOM.render` each time — inline styles on the shell do not
   * survive replacement, which leaves the panel static at the end of `document.body`.
   */
  styleTarget?: HTMLElement | null;
}): void {
  const { shell, inputViewportRect, menuEl, maxMenuHeightPx, positionHost, styleTarget } = args;
  const coordHost = positionHost ?? shell.parentElement;
  if (!coordHost) return;

  const box = styleTarget ?? shell;

  box.style.margin = "0";
  box.style.padding = "0";
  box.style.pointerEvents = "auto";
  box.style.zIndex = PB_FLOATING_UI_Z_INDEX;
  box.style.width = `${Math.round(inputViewportRect.width)}px`;

  if (isPortalCoordinateRootBody(coordHost)) {
    box.style.position = "fixed";
    box.style.left = `${Math.round(inputViewportRect.left)}px`;
    box.style.top = `${Math.round(inputViewportRect.bottom + 4)}px`;
  } else {
    const hr = coordHost.getBoundingClientRect();
    box.style.position = "absolute";
    box.style.left = `${Math.round(inputViewportRect.left - hr.left)}px`;
    box.style.top = `${Math.round(inputViewportRect.bottom - hr.top + 4)}px`;
  }

  if (menuEl) {
    const mh = Math.round(maxMenuHeightPx);
    menuEl.style.maxHeight = `${mh}px`;
    menuEl.style.overflow = "auto";
  }
}

/**
 * Positions a portaled `pb_dropdown` menu: align to trigger width, flip above when needed.
 */
export function positionDropdownPortalToWrapper(args: {
  panel: HTMLElement;
  wrapperViewportRect: DOMRectReadOnly;
  positionHost: HTMLElement;
  marginPx?: number;
  /**
   * When true (default), panel width matches the trigger — correct for dropdown menus.
   * When false, width is left to the panel’s intrinsic size (e.g. Flatpickr is wider than the input).
   */
  matchWrapperWidth?: boolean;
}): void {
  const margin = args.marginPx ?? 5;
  const matchWrapperWidth = args.matchWrapperWidth ?? true;
  const { panel, wrapperViewportRect: wr, positionHost } = args;

  const h =
    panel.getBoundingClientRect().height ||
    panel.scrollHeight ||
    0;

  const spaceBelow = window.innerHeight - wr.bottom;
  const spaceAbove = wr.top;

  let topPx: number;
  if (h > 0 && spaceBelow < h + 10 && spaceAbove >= h + 10) {
    topPx = wr.top - h - margin;
  } else {
    topPx = wr.bottom + margin;
  }

  panel.style.margin = "0";
  panel.style.pointerEvents = "auto";
  panel.style.zIndex = PB_FLOATING_UI_Z_INDEX;
  if (matchWrapperWidth) {
    panel.style.width = `${Math.round(wr.width)}px`;
  } else {
    panel.style.removeProperty("width");
  }

  if (isPortalCoordinateRootBody(positionHost)) {
    panel.style.position = "fixed";
    panel.style.left = `${Math.round(wr.left)}px`;
    panel.style.top = `${Math.round(topPx)}px`;
  } else {
    const hr = positionHost.getBoundingClientRect();
    panel.style.position = "absolute";
    panel.style.left = `${Math.round(wr.left - hr.left)}px`;
    panel.style.top = `${Math.round(topPx - hr.top)}px`;
  }
}
