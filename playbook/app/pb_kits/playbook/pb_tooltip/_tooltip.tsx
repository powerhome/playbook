import React, { useRef, useState, forwardRef, ForwardedRef } from "react"

import {
  arrow,
  flip,
  offset,
  Placement,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react"

import classnames from "classnames"
import { GlobalProps, globalProps } from "../utilities/globalProps"
import { buildAriaProps, buildDataProps, buildHtmlProps } from "../utilities/props"
import Flex from "../pb_flex/_flex"
import { getAllIcons } from "../utilities/icons/allicons"
import Icon from '../pb_icon/_icon'

type TooltipProps = {
  aria?: { [key: string]: string },
  className?: string | string[],
  children: JSX.Element,
  data?: { [key: string]: string },
  delay?: number | Partial<{open: number; close: number}>,
  height?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  icon?: string,
  interaction?: boolean,
  maxHeight?: string,
  maxWidth?: string,
  minHeight?: string,
  minWidth?: string,
  placement?: Placement,
  position?: "absolute" | "fixed";
  text: string,
  width: string,
  showTooltip?: boolean,
  forceOpenTooltip?: boolean,
} & GlobalProps

const Tooltip = forwardRef((props: TooltipProps, ref: ForwardedRef<unknown>): React.ReactElement => {
  const {
    aria = {},
    className,
    children,
    data = {},
    delay = 0,
    height,
    htmlOptions = {},
    icon = null,
    interaction = false,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    placement: preferredPlacement = "top",
    position = "absolute",
    text,
    showTooltip = true,
    width,
    zIndex,
    forceOpenTooltip = false,
    ...rest
  } = props

  const dataProps: { [key: string]: string } = buildDataProps(data)
  const ariaProps: { [key: string]: string } = buildAriaProps(aria)
  const htmlProps = buildHtmlProps(htmlOptions)

  const css = classnames(
    globalProps({...rest}),
    className,
  )
  const [open, setOpen] = useState(false)
  const arrowRef = useRef(null)

  const {
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {},  },
    placement,
    refs,
    strategy,
    x,
    y,
  } = useFloating({
    strategy: position,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      flip({
        fallbackPlacements: ["top", "right", "bottom", "left"],
        fallbackStrategy: "initialPlacement",
        flipAlignment: false,
      }),
      offset(10),
      shift()
    ],
    open,
    onOpenChange(open) {
      if(!showTooltip) {
        return
      } else {
        setOpen(open)
      }
    },
    placement: preferredPlacement
  })


  const { getFloatingProps } = useInteractions([
    useHover(context, {
      delay,
      handleClose: interaction ? safePolygon({
        blockPointerEvents: false
      }) : null
    })
  ])

  const staticSide = {
    bottom: "top",
    left: "right",
    right: "left",
    top: "bottom",
  }[placement.split("-")[0]]

  const tooltipSizing = () => {
    return Object.assign(
      {},
      height ? { height: height } : {},
      maxHeight ? { maxHeight: maxHeight } : {},
      maxWidth ? { maxWidth: maxWidth } : {},
      minHeight ? { minHeight: minHeight } : {},
      minWidth ? { minWidth: minWidth } : {},
      width ? { width: width } : {}
    );
};

  return (
    <>
      <div
          className={`pb_tooltip_kit ${css}`}
          ref={(element) => {
            refs.setReference(element);
            if (ref) {
              if (typeof ref === "function") {
                ref(element);
              } else if (typeof ref === "object") {
                ref.current = element;
              }
            }
          }}
          role="tooltip_trigger"
          style={{ display: "inline-block" }}
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
      >
        {children}
      </div>
      {(open || forceOpenTooltip) && (
        <div
            {...getFloatingProps({
              className: `tooltip_tooltip ${placement} visible`,
              ref: refs.setFloating,
              role: "tooltip",
              style: {
                ...tooltipSizing(),
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                zIndex: zIndex ?? 0,
              },
            })}
        >
          <Flex
              align="center"
              gap="xs"
          >
            {icon && (
            <i className={`pb_icon_kit`}>
              <Icon
                  icon={icon}
              />
            </i>)}
            {text}
          </Flex>
          <div
              className="arrow_bg"
              ref={arrowRef}
              style={{
                position: "absolute",
                left: arrowX != null ? `${arrowX}px` : "",
                top: arrowY != null ? `${arrowY}px` : "",
                [staticSide]: "-5px",
              }}
          />
        </div>
      )}
    </>
  )
})

Tooltip.displayName = "Tooltip"

export default Tooltip