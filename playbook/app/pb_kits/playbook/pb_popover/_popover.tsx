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
import _uniqueId from 'lodash/uniqueId';

type PbPopoverProps = {
  aria?: { [key: string]: string };
  className?: string;
  closeOnClick?: "outside" | "inside" | "any";
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  id?: string;
  offset?: boolean;
  reference: PopperReference & any;
  show?: boolean;
  shouldClosePopover?: (arg0: boolean) => void;
} & GlobalProps & Omit<PopperProps<any>, 'children'>
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
  offset: {};
}) => {
  return offset ? modifiers.concat([POPOVER_MODIFIERS.offset]) : modifiers;
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
    targetId,
  } = props;

  const popoverSpacing =
    globalProps(props).includes("dark") || !globalProps(props)
      ? "p_sm"
      : globalProps(props);
  const overflowHandling = maxHeight || maxWidth ? "overflow_handling" : "";
  const zIndexStyle = zIndex ? { zIndex: zIndex } : {};
  const widthHeightStyles = () => {
    return Object.assign(
      {},
      maxHeight ? { maxHeight: maxHeight } : {},
      maxWidth ? { maxWidth: maxWidth } : {},
      minHeight ? { minHeight: minHeight } : {},
      minWidth ? { minWidth: minWidth } : {}
    );
  };
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_popover_kit"),
    globalProps(props),
    className
  );

  return (
    <Popper
        modifiers={popoverModifiers({ modifiers, offset })}
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

const PbReactPopover = (props: PbPopoverProps) => {
  const [targetId] = useState(_uniqueId('id-'))
  const {
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
  } = props;

  useEffect(() => {
    const { closeOnClick, shouldClosePopover = noop } = props;

    if (!closeOnClick) return;

    document.body.addEventListener(
      "click",
      ({ target }) => {
        const targetIsPopover =
          (target as HTMLElement).closest("#" + targetId) !==
          null;
        const targetIsReference =
          (target as HTMLElement).closest("#reference-" + targetId) !==
          null;

        switch (closeOnClick) {
          case "outside":
            if (!targetIsPopover && !targetIsReference) {
              shouldClosePopover(true);
            }
            break;
          case "inside":
            if (targetIsPopover) {
              shouldClosePopover(true);
            }
            break;
          case "any":
            if (targetIsPopover || !targetIsPopover && !targetIsReference) {
              shouldClosePopover(true);
            }
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
                  id={"reference-" + targetId}
                  className="pb_popover_reference_wrapper"
                  ref={ref}>
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
                document.querySelector(portal)
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