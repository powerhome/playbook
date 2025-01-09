import React, { useState, useEffect, useRef } from "react"
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

type DrawerContextType = {
  onClose: () => void;
} | null;

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

const Drawer = (props: DrawerProps): React.ReactElement | null => {
  const {
    aria = {},
    behavior = "floating",
    border = "none",
    breakpoint = "none",
    className,
    data = {},
    htmlOptions = {},
    id,
    size = "md",
    children,
    fullHeight = true,
    menuButtonID,
    opened,
    onClose,
    overlay = true,
    placement = "left",
    withinElement = false,
  } = props

  const drawerRef = useRef<HTMLDivElement>(null)
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

  // Handle height animation for top/bottom placements
  useEffect(() => {
    if (drawerRef.current && (placement === "top" || placement === "bottom")) {
      const elem = drawerRef.current
      
      if (animationState === "afterOpen") {
        elem.style.display = 'block'
        const height = elem.scrollHeight + 'px'
        elem.style.height = height
        elem.style.overflow = "hidden"
        
        window.setTimeout(() => {
          elem.style.height = ''
          elem.style.overflow = "visible"
        }, 300)
      } else if (animationState === "beforeClose") {
        elem.style.height = elem.scrollHeight + 'px'
        
        window.setTimeout(() => {
          elem.style.height = '0'
          elem.style.overflow = "hidden"
        }, 1)
      }
    }
  }, [animationState, placement])

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
    buildCss("pb_drawer", size as string, placement as string),
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
        ref={drawerRef}
        style={{
          ...dynamicInlineProps,
          ...(placement === "top" || placement === "bottom" 
            ? { height: 0, transition: "height 300ms ease" } 
            : {})
        }}
    >
      {children}
    </div>
  )

  if (!isVisible) return null

  return (
    <DialogContext.Provider value={api as DrawerContextType}>
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
