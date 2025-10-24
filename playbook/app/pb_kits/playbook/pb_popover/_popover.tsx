/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from "react";
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
    // Find the reference wrapper span that gets created by PopperReference
    const referenceWrapper = document.querySelector(`#reference-${targetId}`);
    if (referenceWrapper?.parentElement) {
      return referenceWrapper.parentElement;
    }
  }

  const selectorMatch = document.querySelector(appendTo);
  if (selectorMatch instanceof HTMLElement) return selectorMatch;

  // fallback
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
              <div
                  className={classnames(
                    "pb_popover_body",
                    popoverSpacing,
                    overflowHandling
                  )}
                  id={targetId}
                  style={widthHeightStyles()}
              >
                {children}
              </div>
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
  } = props;

  useEffect(() => {
    const { closeOnClick, shouldClosePopover = noop } = props;

    if (!closeOnClick) return;

    document.body.addEventListener(
      "click",
      (e: MouseEvent) => {
        const target = e.target as HTMLElement

        const targetIsPopover =
          target.closest("#" + targetId) !== null;
        const targetIsReference =
          target.closest("#reference-" + targetId) !== null;

        const shouldClose = () => {
          setTimeout(() => shouldClosePopover(true), 0);
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
      },
      { capture: true }
    );
  }, []);

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
            { popoverComponent }
          ))}
      </>
    </PopperManager>
  );
};

export default PbReactPopover;
