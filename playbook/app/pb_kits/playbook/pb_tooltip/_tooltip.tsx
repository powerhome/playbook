/* @flow*/

import React, { useRef, useState } from "react"
import classnames from "classnames"
import {
  Placement,
  offset,
  arrow,
  shift,
  useFloating,
  useInteractions,
  useHover,
  flip,
} from "@floating-ui/react-dom-interactions"
import { GlobalProps, globalProps } from "../utilities/globalProps"
import { buildAriaProps, buildDataProps } from "../utilities/props"

type TooltipProps = {
  aria?: { [key: string]: string },
  data?: { [key: string]: string },
  text: string,
  placement?: Placement,
  children: JSX.Element,
  zIndex?: Pick<GlobalProps, "ZIndex">,
} & GlobalProps

const Tooltip = (props: TooltipProps) => {
  const {
    aria = {},
    children,
    data = {},
    text,
    placement: preferredPlacement = "top",
    zIndex,
    ...rest
  } = props

  const dataProps: { [key: string]: any } = buildDataProps(data)
  const ariaProps: { [key: string]: any } = buildAriaProps(aria)

  const css = classnames(globalProps(rest))

  const [open, setOpen] = useState(false)
  const arrowRef = useRef(null)
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement: preferredPlacement,
    open,
    onOpenChange(open) {
      setOpen(open)
    },
    middleware: [
      offset(10),
      shift(),
      flip({
        fallbackPlacements: ["top", "right", "bottom", "left"],
        fallbackStrategy: "initialPlacement",
        flipAlignment: false,
      }),
      arrow({
        element: arrowRef,
      }),
    ],
  })

  const { getFloatingProps } = useInteractions([useHover(context)])

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]]

  return (
    <>
      <div
        ref={reference}
        className={`pb_tooltip_kit ${css}`}
        style={{ display: "inline-flex" }}
        role="tooltip_trigger"
        {...ariaProps}
        {...dataProps}
      >
        {children}
      </div>
      {open && (
        <div
          {...getFloatingProps({
            role: "tooltip",
            ref: floating,
            className: `tooltip_tooltip ${placement} show`,
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: zIndex ?? 0,
            },
          })}
        >
          {text}
          <div
            ref={arrowRef}
            className="arrow_bg"
            style={{
              position: strategy,
              left: arrowX != null ? `${arrowX}px` : "",
              top: arrowY != null ? `${arrowY}px` : "",
              [staticSide]: "-5px",
            }}
          />
        </div>
      )}
    </>
  )
}

export default Tooltip
