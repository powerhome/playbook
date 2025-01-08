import React, { useState, useEffect } from "react"
import classnames from "classnames"

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../utilities/props"
import { globalProps, globalInlineProps } from "../utilities/globalProps"
import { DialogContext } from "../pb_dialog/_dialog_context"
import { useBreakpoint } from "./hooks/useBreakpoint"
import { useDrawerAnimation } from "./hooks/useDrawerAnimation"

type DrawerProps = {
  aria?: { [key: string]: string }
  behavior?: "floating" | "push"
  border?: "full" | "none" | "right" | "left"
  breakpoint?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  children: React.ReactNode | React.ReactNode[] | string
  className?: string
  data?: { [key: string]: string }
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) }
  id?: string
  fullHeight?: boolean
  menuButtonID?: string
  onClose?: () => void
  opened: boolean
  overlay: boolean
  placement?: "left" | "right" | "top" | "bottom"
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
  text?: string
  withinElement?: boolean
}

const Drawer = (props: DrawerProps): React.ReactElement => {
  const {
    aria = {},
    behavior = "floating",
    border = "none",
    breakpoint = "none",
    className,
    data = {},
    htmlOptions = {},
    id,
    size,
    children,
    fullHeight = true,
    menuButtonID,
    opened,
    onClose,
    overlay = true,
    placement = "left",
    withinElement = false,
  } = props

  const [menuButtonOpened, setMenuButtonOpened] = useState(false)

  const { isOpenBreakpointOpen, isUserClosed, setIsUserClosed } = useBreakpoint(
    {
      openBreakpoint: breakpoint,
      closeBreakpoint: breakpoint,
      menuButtonID,
    }
  )

  const modalIsOpened =
    (isOpenBreakpointOpen && !isUserClosed) || menuButtonOpened || opened

  const { animationState, isVisible } = useDrawerAnimation(modalIsOpened)

  // Handle menu button click
  useEffect(() => {
    if (menuButtonID) {
      const menuButton = document.getElementById(menuButtonID)
      if (menuButton) {
        const handleMenuButtonClick = () => {
          if (modalIsOpened) {
            setMenuButtonOpened(false)
            setIsUserClosed(true)
          } else {
            setMenuButtonOpened(true)
            setIsUserClosed(false)
          }
        }
        menuButton.addEventListener("click", handleMenuButtonClick)
        return () => {
          menuButton.removeEventListener("click", handleMenuButtonClick)
        }
      }
    }
  }, [menuButtonID, modalIsOpened])

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const dynamicInlineProps = globalInlineProps(props)

  const drawerClasses = classnames(
    "pb_drawer",
    buildCss("pb_drawer", size, placement),
    {
      drawer_border_full: border === "full",
      drawer_border_right: border === "right",
      drawer_border_left: border === "left",
      pb_drawer_within_element: withinElement,
      pb_drawer_after_open: animationState === "afterOpen",
      pb_drawer_before_close: animationState === "beforeClose",
    },
    withinElement ? "shadow_none" : "shadow_deepest",
    globalProps(props),
    className
  )

  const overlayClasses = classnames(
    `pb_drawer${overlay ? "_overlay" : "_no_overlay"}`,
    fullHeight && `full_height_${placement}`,
    !overlay && "no-background",
    {
      pb_drawer_overlay_after_open: animationState === "afterOpen",
      pb_drawer_overlay_before_close: animationState === "beforeClose",
    }
  )

  const api = {
    onClose: () => {
      if (menuButtonID) {
        setMenuButtonOpened(false)
      }
      setIsUserClosed(true)
      if (onClose) {
        onClose()
      }
    },
  }

  const drawerContent = (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        
        className={drawerClasses}
        onClick={(e) => e.stopPropagation()}
        style={dynamicInlineProps}
    >
      {children}
    </div>
  )

  if (!isVisible) return null

  return (
    <DialogContext.Provider value={api}>
      {withinElement ? (
        drawerContent
      ) : (
        <div
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classnames(buildCss("pb_drawer_wrapper"), className)}
            style={dynamicInlineProps}
        >
          <div
              className={overlayClasses}
              id={id}
              onClick={overlay ? api.onClose : undefined}
          >
            {drawerContent}
          </div>
        </div>
      )}
    </DialogContext.Provider>
  )
}

export default Drawer
