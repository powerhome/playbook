import React, { useRef, useState } from "react"

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
import { buildAriaProps, buildDataProps } from "../utilities/props"
import Flex from "../pb_flex/_flex"

type TooltipProps = {
  aria?: { [key: string]: string },
  className?: string | string[],
  children: JSX.Element,
  data?: { [key: string]: string },
  delay?: number | Partial<{open: number; close: number}>,
  icon?: string,
  interaction?: boolean,
  placement?: Placement,
  position?: "absolute" | "fixed";
  text: string,
} & GlobalProps

const Tooltip = (props: TooltipProps): React.ReactElement => {
  const {
    aria = {},
    className,
    children,
    data = {},
    delay = 0,
    icon = null,
    interaction = false,
    placement: preferredPlacement = "top",
    position = "absolute",
    text,
    zIndex,
    ...rest
  } = props

  const dataProps: { [key: string]: any } = buildDataProps(data)
  const ariaProps: { [key: string]: any } = buildAriaProps(aria)
  
  const css = classnames(
    globalProps({...rest}),
    className,
  )
  const [open, setOpen] = useState(false)
  const arrowRef = useRef(null)


  const {
    context,
    floating,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {},  },
    placement,
    reference,
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
      setOpen(open)
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

  return (
    <>
      <div
          className={`pb_tooltip_kit ${css}`}
          ref={reference}
          role="tooltip_trigger"
          style={{ display: "inline-flex" }}
          {...ariaProps}
          {...dataProps}
      >
        {children}
      </div>
      {open && (
        <div
            {...getFloatingProps({
              className: `tooltip_tooltip ${placement} visible`,
              ref: floating,
              role: "tooltip",
              style: {
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
            <i className={`pb_icon_kit far fa-${icon} fa-fw`} />
            )}
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
}

export default Tooltip