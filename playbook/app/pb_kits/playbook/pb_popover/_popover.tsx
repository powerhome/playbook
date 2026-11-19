/* eslint-disable react/no-multi-comp */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  autoUpdate,
  flip,
  Middleware,
  offset as offsetMiddleware,
  Placement,
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
  placement?: Placement;
  portal?: string;
  reference?: React.ReactElement & any;
  referenceElement?: Element | null;
  show?: boolean;
  shouldClosePopover?: (arg0: boolean) => void;
  strategy?: Strategy;
  usePortal?: boolean;
} & ModifiedGlobalProps
& { children?: React.ReactChild[] | React.ReactChild }

type PopperLikeModifier = {
  name: string;
  enabled?: boolean;
  options?: { offset?: [number, number] } & Record<string, unknown>;
};

// Matches the Popper.js `offset: [0, 20]` modifier previously enabled by the `offset` prop.
const POPOVER_OFFSET = 20;

// Popper.js enables flip + preventOverflow by default; floating-ui's equivalents are flip + shift.
// Legacy Popper modifiers are translated where a 1:1 mapping exists so existing consumers keep working.
const buildMiddleware = (offset: boolean, modifiers: PopperLikeModifier[] = []): Middleware[] => {
  const byName = (name: string) => modifiers.find((modifier) => modifier.name === name);
  const isDisabled = (name: string) => byName(name)?.enabled === false;

  const [skidding, distance] = byName("offset")?.options?.offset ?? [0, offset ? POPOVER_OFFSET : 0];

  return [
    offsetMiddleware({ mainAxis: distance, crossAxis: skidding }),
    // `initialPlacement` matches Popper: when no side fits, keep the requested placement instead of the best fit.
    !isDisabled("flip") && flip({ fallbackStrategy: "initialPlacement" }),
    !isDisabled("preventOverflow") && shift(),
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
              style={Object.assign({}, floatingStyles, zIndexStyle)}
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

  const middleware = useMemo(
    () => buildMiddleware(offset, modifiers),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, JSON.stringify(modifiers)],
  );

  const { refs, floatingStyles, placement: resolvedPlacement } = useFloating({
    elements: referenceElement ? { reference: referenceElement } : undefined,
    middleware,
    open: show,
    placement,
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
