/* eslint-disable react/no-multi-comp */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  autoPlacement,
  autoUpdate,
  flip,
  Middleware,
  offset as offsetMiddleware,
  Placement,
  Rect,
  shift,
  Strategy,
  useFloating,
} from "@floating-ui/react";

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
  noop,
} from "../utilities/props";

import classnames from "classnames";
import { globalProps, GlobalProps } from "../utilities/globalProps";
import { uniqueId } from '../utilities/object';
import { DialogContext, DialogContextValue } from "../pb_dialog/_dialog_context";
import {
  PB_FLOATING_OWNER_ATTR,
  isPortaledFloatingKitInteraction,
  resolveFullscreenOverlayForElement,
} from "../utilities/floatingPortalHosts";

type ModifiedGlobalProps = Omit<GlobalProps, 'minWidth' | 'maxHeight' | 'minHeight'>

type PbPopoverProps = {
  appendTo?: string;
  aria?: { [key: string]: string };
  className?: string;
  closeOnClick?: "outside" | "inside" | "any";
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  /** @deprecated Popper.js modifiers. Only `offset`, `flip` and `preventOverflow` are translated to floating-ui middleware. */
  modifiers?: PopperLikeModifier[];
  offset?: boolean;
  placement?: PopoverPlacement;
  portal?: string;
  reference?: React.ReactElement & any;
  referenceElement?: Element | null;
  show?: boolean;
  shouldClosePopover?: (arg0: boolean) => void;
  strategy?: Strategy;
  usePortal?: boolean;
} & ModifiedGlobalProps
& { children?: React.ReactChild[] | React.ReactChild }

// Loose on purpose: consumers pass Popper.js modifier objects as-is (e.g. `enabled: "true"`, `phase`).
export type PopperLikeModifier = {
  name: string;
  enabled?: boolean | string;
  phase?: string;
  options?: Record<string, any>;
  [key: string]: unknown;
};

/** Popper.js `auto*` placements, mapped to floating-ui's `autoPlacement()` middleware. */
type AutoPlacement = "auto" | "auto-start" | "auto-end";
export type PopoverPlacement = Placement | AutoPlacement;

type PopperOffset = [number?, number?];
type PopperOffsetFn = (args: { placement: Placement; popper: Rect; reference: Rect }) => PopperOffset;

// Matches the Popper.js `offset: [0, 20]` modifier previously enabled by the `offset` prop.
const POPOVER_OFFSET = 20;

const POPPER_INSET_STYLE: React.CSSProperties = { right: "auto", bottom: "auto" };

const isAutoPlacement = (placement: PopoverPlacement): placement is AutoPlacement =>
  placement === "auto" || placement === "auto-start" || placement === "auto-end";

// Popper.js `offset` is `[skidding, distance]` or a function returning it; floating-ui calls these crossAxis / mainAxis.
const toOffsetMiddleware = (popperOffset: unknown): Middleware => {
  const toAxes = ([skidding, distance]: PopperOffset = []) => ({ mainAxis: distance ?? 0, crossAxis: skidding ?? 0 });

  if (typeof popperOffset === "function") {
    return offsetMiddleware(({ placement, rects }) =>
      toAxes((popperOffset as PopperOffsetFn)({ placement, popper: rects.floating, reference: rects.reference })));
  }
  if (typeof popperOffset === "number") return offsetMiddleware(popperOffset);
  return offsetMiddleware(toAxes(Array.isArray(popperOffset) ? popperOffset as PopperOffset : undefined));
};

// Popper.js enables flip + preventOverflow by default; floating-ui's equivalents are flip + shift.
// Legacy Popper modifiers are translated where a mapping exists so existing consumers keep working.
export const buildMiddleware = (
  offset: boolean,
  modifiers: PopperLikeModifier[] = [],
  placement: PopoverPlacement = "left",
): Middleware[] => {
  const byName = (name: string) => modifiers.find((modifier) => modifier.name === name);
  const isDisabled = (name: string) => {
    const enabled = byName(name)?.enabled;
    return enabled === false || enabled === "false";
  };

  const offsetModifier = byName("offset");
  const flipOptions = byName("flip")?.options ?? {};
  const shiftOptions = byName("preventOverflow")?.options ?? {};

  let offsetStep: Middleware | false = false;
  if (!isDisabled("offset")) {
    offsetStep = offsetModifier?.options?.offset !== undefined
      ? toOffsetMiddleware(offsetModifier.options.offset)
      : offsetMiddleware(offset ? POPOVER_OFFSET : 0);
  }

  // floating-ui docs: don't combine autoPlacement() with flip(); Popper computed auto placements inside flip.
  let placementStep: Middleware | false = false;
  if (isAutoPlacement(placement)) {
    placementStep = autoPlacement({
      alignment: placement === "auto" ? null : placement === "auto-start" ? "start" : "end",
      allowedPlacements: flipOptions.allowedAutoPlacements,
      autoAlignment: flipOptions.flipVariations !== false,
      padding: flipOptions.padding,
    });
  } else if (!isDisabled("flip")) {
    // Only options with the same meaning in both libraries; Popper's `boundary` values differ from floating-ui's.
    placementStep = flip({
      // `initialPlacement` matches Popper: when no side fits, keep the requested placement instead of the best fit.
      fallbackStrategy: "initialPlacement",
      ...(flipOptions.fallbackPlacements && { fallbackPlacements: flipOptions.fallbackPlacements }),
      ...(flipOptions.flipVariations === false && { flipAlignment: false }),
      ...(flipOptions.padding !== undefined && { padding: flipOptions.padding }),
    });
  }

  return [
    offsetStep,
    placementStep,
    !isDisabled("preventOverflow") && shift({
      ...(shiftOptions.altAxis !== undefined && { crossAxis: Boolean(shiftOptions.altAxis) }),
      ...(shiftOptions.padding !== undefined && { padding: shiftOptions.padding }),
    }),
  ].filter(Boolean) as Middleware[];
};

const getAppendTarget = (
  appendTo: string | undefined,
  targetId: string
): HTMLElement => {
  if (appendTo && appendTo !== "body") {
    if (appendTo === "parent") {
      const referenceWrapper = document.querySelector(`#reference-${targetId}`);
      if (referenceWrapper?.parentElement) {
        return referenceWrapper.parentElement;
      }
    }

    const selectorMatch = document.querySelector(appendTo);
    if (selectorMatch instanceof HTMLElement) return selectorMatch;
  }

  const referenceWrapper = document.querySelector(`#reference-${targetId}`);
  const fullscreenOverlay = resolveFullscreenOverlayForElement(referenceWrapper);
  if (fullscreenOverlay) return fullscreenOverlay;

  return document.body;
};

type PopoverProps = PbPopoverProps & {
  floatingRef: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  targetId: string;
};

const Popover = (props: PopoverProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    htmlOptions = {},
    id,
    floatingRef,
    floatingStyles,
    placement,
    zIndex,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width,
    targetId,
  } = props;

  const items = globalProps(props).split(' ')
  const filteredItems = items.filter(item => !item.includes('min-width') && !item.includes('width'))
  const filteredGlobalProps = filteredItems.join(' ')
  const popoverSpacing =
    filteredGlobalProps.includes("dark") || !filteredGlobalProps
      ? "p_sm"
      : filteredGlobalProps
  const overflowHandling = maxHeight || maxWidth ? "overflow_handling" : "";
  const zIndexStyle = zIndex ? { zIndex: zIndex } : {};

  const [selectMenuPortalTarget, setSelectMenuPortalTarget] =
    useState<HTMLElement | null>(null);
  const floatingRootRef = useCallback((node: HTMLElement | null) => {
    setSelectMenuPortalTarget(node);
  }, []);

  const menuPortalApi: DialogContextValue = useMemo(
    () => ({ selectMenuPortalTarget }),
    [selectMenuPortalTarget],
  );
  const widthHeightStyles = () => {
    return Object.assign(
      {},
      maxHeight ? { maxHeight: maxHeight } : {},
      maxWidth ? { maxWidth: maxWidth } : {},
      minHeight ? { minHeight: minHeight } : {},
      minWidth ? { minWidth: minWidth } : {},
      width ? { width: width } : {}
    );
  };
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_popover_kit"),
    filteredGlobalProps,
    className
  );

  return (
          <div
              {...ariaProps}
              {...dataProps}
              {...htmlProps}
              className={classes}
              data-placement={placement}
              id={id}
              ref={floatingRef}
              // right/bottom: auto restores what Popper's inline `inset: 0 auto auto 0` did: stylesheet right/bottom rules don't apply.
              style={Object.assign({}, floatingStyles, POPPER_INSET_STYLE, zIndexStyle)}
          >
            <div
                className={classnames(`${buildCss("pb_popover_tooltip")} show`)}
            >
            <div
                className={classnames("pb_popover_body", popoverSpacing)}
                id={targetId}
                style={widthHeightStyles()}
                {...(targetId ? { [PB_FLOATING_OWNER_ATTR]: targetId } : {})}
            >
              <DialogContext.Provider value={menuPortalApi}>
                <div
                    className={classnames(
                      "pb_popover_scroll_region",
                      overflowHandling,
                    )}
                >
                  {children}
                </div>
                <div
                    aria-hidden="true"
                    className="pb_popover_floating_root"
                    data-pb-dialog-floating-root="true"
                    {...(targetId ? { [PB_FLOATING_OWNER_ATTR]: targetId } : {})}
                    ref={floatingRootRef}
                />
              </DialogContext.Provider>
            </div>
            </div>
          </div>
  );
};

const PbReactPopover = (props: PbPopoverProps): React.ReactElement => {
  const [targetId] = useState(uniqueId('id-'))
  const {
    appendTo,
    className,
    children,
    modifiers = [],
    offset = false,
    placement = "left",
    reference,
    referenceElement,
    show = false,
    strategy = "absolute",
    usePortal = true,
    zIndex,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width,
    closeOnClick,
    shouldClosePopover = noop,
  } = props;

  // Modifier arrays are usually recreated each render; the fingerprint keeps middleware stable.
  // Function offsets don't serialize, so their source is included (a changed closure value won't re-run).
  const modifiersKey = JSON.stringify(modifiers, (_key, value) => typeof value === "function" ? value.toString() : value);
  const middleware = useMemo(
    () => buildMiddleware(offset, modifiers, placement),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, modifiersKey, placement],
  );

  const { refs, floatingStyles, placement: resolvedPlacement } = useFloating({
    elements: referenceElement ? { reference: referenceElement } : undefined,
    middleware,
    open: show,
    // autoPlacement() picks the side; floating-ui needs a real placement as the starting point.
    placement: isAutoPlacement(placement) ? "bottom" : placement,
    strategy,
    whileElementsMounted: autoUpdate,
  });

  // Store latest callback in a ref to avoid re-runs
  const shouldClosePopoverRef = useRef(shouldClosePopover);

  // Update ref on change
  useEffect(() => {
    shouldClosePopoverRef.current = shouldClosePopover;
  }, [shouldClosePopover]);

  useEffect(() => {
    if (!closeOnClick) return;

    // Function to handle popover event listener and targetId.
    // Ensure that whenever the component is conditionally rendered
    // that the old listener is removed and the new listener is
    // updated with the targetId.
    const handleClick = (e: MouseEvent) => {
      const targetEl =
        e.target instanceof Element ? (e.target as HTMLElement) : null

      const targetIsPopover =
        (targetEl?.closest("#" + targetId) !== null) ||
        isPortaledFloatingKitInteraction(e.target, targetId, e.clientX, e.clientY);
      const targetIsReference =
        targetEl?.closest("#reference-" + targetId) !== null;

      const shouldClose = () => {
        setTimeout(() => shouldClosePopoverRef.current(true), 0);
      }

      switch (closeOnClick) {
        case "outside":
          if (!targetIsPopover && !targetIsReference) shouldClose();
          break;
        case "inside":
          if (isPortaledFloatingKitInteraction(e.target, targetId, e.clientX, e.clientY)) return
          if (targetIsPopover) shouldClose();
          break;
        case "any":
          if (isPortaledFloatingKitInteraction(e.target, targetId, e.clientX, e.clientY)) return
          if (targetIsPopover || !targetIsPopover && !targetIsReference) shouldClose();
          break;
      }
    };

    document.body.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", handleClick, { capture: true });
    };
  }, [targetId, closeOnClick]);

  const popoverComponent = (
    <Popover
        className={className}
        floatingRef={refs.setFloating}
        floatingStyles={floatingStyles}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minHeight={minHeight}
        minWidth={minWidth}
        modifiers={modifiers}
        {...props}
        placement={resolvedPlacement}
        targetId={targetId}
        width={width}
        zIndex={zIndex}
    >
      {children}
    </Popover>
  );

  return (
      <>
        {reference && !referenceElement && (
          <span
              className="pb_popover_reference_wrapper"
              id={"reference-" + targetId}
              ref={refs.setReference}
          >
            <reference.type {...reference.props} />
          </span>
        )}
        {show &&
          (usePortal ? (
            <>
                {ReactDOM.createPortal(
                  popoverComponent,
                  getAppendTarget(appendTo, targetId)
                )}
            </>
          ) : (
            popoverComponent
          ))}
      </>
  );
};

export default PbReactPopover;
