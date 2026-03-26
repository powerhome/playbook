/* eslint-disable react/no-multi-comp */
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  Popper,
  Manager as PopperManager,
  Modifier,
  PopperProps,
  Reference as PopperReference,
} from "react-popper";

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

import { PopoverBodyContext } from "./popover_body_context";

type ModifiedGlobalProps = Omit<GlobalProps, 'minWidth' | 'maxHeight' | 'minHeight'>

type PbPopoverProps = {
  appendTo?: string;
  aria?: { [key: string]: string };
  className?: string;
  closeOnClick?: "outside" | "inside" | "any";
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  offset?: boolean;
  reference: PopperReference & any;
  show?: boolean;
  shouldClosePopover?: (arg0: boolean) => void;
  /**
   * When `maxHeight` / `maxWidth` / `width` are set: use an outer popover body with
   * `overflow: visible` and an inner scroll region with `overflow: auto`, so long
   * content scrolls while overlay kits (e.g. Dropdown) can portal to the outer body
   * and avoid clipping.
   */
  scrollShell?: boolean;
  /**
   * Relaxes clipping from the popover body. With **only** width/maxWidth: single-layer
   * body with no `overflow: auto` so overlays can extend past the edge. With
   * **maxHeight**: uses the scroll shell (outer overflow visible + inner scroll) so
   * height is respected and Dropdown can still portal to the outer body.
   */
  allowOverflow?: boolean;
} & ModifiedGlobalProps & Omit<PopperProps<any>, 'children'>
& { children?: React.ReactChild[] | React.ReactChild }

// Prop enabled default modifiers here
// https://popper.js.org/docs/v2/modifiers

const POPOVER_MODIFIERS = {
  offset: {
    //https://popper.js.org/docs/v2/modifiers/offset/
    enabled: true,
    name: "offset",
    options: {
      offset: [0, 20],
    },
    phase: "main",
  },
};

const popoverModifiers = ({
  modifiers,
  offset,
}: {
  modifiers: Modifier<any> & any;
  offset: boolean;
}) => {
  return offset ? modifiers.concat([POPOVER_MODIFIERS.offset]) : modifiers;
};

const getAppendTarget = (
  appendTo: string | undefined,
  targetId: string
): HTMLElement => {
  if (!appendTo || appendTo === "body") return document.body;

  if (appendTo === "parent") {
    const referenceWrapper = document.querySelector(`#reference-${targetId}`);
    if (referenceWrapper?.parentElement) {
      return referenceWrapper.parentElement;
    }
  }

  const selectorMatch = document.querySelector(appendTo);
  if (selectorMatch instanceof HTMLElement) return selectorMatch;

  return document.body;
};

const Popover = (props: PbPopoverProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    htmlOptions = {},
    id,
    modifiers,
    offset,
    placement,
    referenceElement,
    zIndex,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width,
    targetId,
    scrollShell = false,
    allowOverflow = false,
  } = props;

  const outerBodyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollShellContext = useMemo(
    () => ({ bodyRef: outerBodyRef, scrollRef }),
    []
  );

  const items = globalProps(props).split(' ')
  const filteredItems = items.filter(item => !item.includes('min-width') && !item.includes('width'))
  const filteredGlobalProps = filteredItems.join(' ')
  const popoverSpacing =
    filteredGlobalProps.includes("dark") || !filteredGlobalProps
      ? "p_sm"
      : filteredGlobalProps
  const hasMaxDimensions = Boolean(maxHeight || maxWidth || width);
  const hasMaxHeight = Boolean(maxHeight);
  const useScrollShellLayout = Boolean(
    hasMaxDimensions &&
      (scrollShell || (Boolean(allowOverflow) && hasMaxHeight))
  );
  const overflowHandling =
    hasMaxDimensions && !useScrollShellLayout && !allowOverflow
      ? "overflow_handling"
      : "";
  const zIndexStyle = zIndex ? { zIndex: zIndex } : {};
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

  const bodyContent = useScrollShellLayout ? (
    <PopoverBodyContext.Provider value={scrollShellContext}>
      <div
          className={classnames(
            "pb_popover_body",
            "pb_popover_body--scrollable",
            popoverSpacing
          )}
          id={targetId}
          ref={outerBodyRef}
          style={widthHeightStyles()}
      >
        <div
            className={classnames("pb_popover_body_scroll", "overflow_handling")}
            ref={scrollRef}
        >
          {children}
        </div>
      </div>
    </PopoverBodyContext.Provider>
  ) : (
    <div
        className={classnames("pb_popover_body", popoverSpacing, overflowHandling)}
        id={targetId}
        style={widthHeightStyles()}
    >
      {children}
    </div>
  );

  return (
    <Popper
        modifiers={popoverModifiers({ modifiers, offset: offset || false })}
        placement={placement}
        referenceElement={referenceElement}
    >
      {({ placement, ref, style }) => {
        return (
          <div
              {...ariaProps}
              {...dataProps}
              {...htmlProps}
              className={classes}
              data-placement={placement}
              id={id}
              ref={ref}
              style={Object.assign({}, style, zIndexStyle)}
          >
            <div
                className={classnames(`${buildCss("pb_popover_tooltip")} show`)}
            >
              {bodyContent}
            </div>
          </div>
        );
      }}
    </Popper>
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
    portal = "body",
    reference,
    referenceElement,
    show = false,
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
      const target = e.target as HTMLElement

      const targetIsPopover =
        target.closest("#" + targetId) !== null;
      const targetIsReference =
        target.closest("#reference-" + targetId) !== null;

      const shouldClose = () => {
        setTimeout(() => shouldClosePopoverRef.current(true), 0);
      }

      switch (closeOnClick) {
        case "outside":
          if (!targetIsPopover && !targetIsReference) shouldClose();
          break;
        case "inside":
          if (targetIsPopover) shouldClose();
          break;
        case "any":
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
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minHeight={minHeight}
        minWidth={minWidth}
        modifiers={modifiers}
        offset={offset}
        placement={placement}
        referenceElement={referenceElement}
        targetId={targetId}
        width={width}
        zIndex={zIndex}
        {...props}
    >
      {children}
    </Popover>
  );

  return (
    <PopperManager>
      <>
        {reference && !referenceElement && (
          <PopperReference>
            {({ ref }) => (
              <span
                  className="pb_popover_reference_wrapper"
                  id={"reference-" + targetId}
                  ref={ref}
              >
                <reference.type {...reference.props} />
              </span>
            )}
          </PopperReference>
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
    </PopperManager>
  );
};

export default PbReactPopover;
