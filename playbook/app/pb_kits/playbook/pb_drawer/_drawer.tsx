import React, { useState, useEffect, useRef } from "react"
import classnames from "classnames"

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../utilities/props"
import { globalProps, globalInlineProps } from "../utilities/globalProps"
import { DrawerContext } from "./context"
import { useBreakpoint } from "./hooks/useBreakpoint"
import { useDrawerAnimation } from "./hooks/useDrawerAnimation"
// import { showElement, hideElement } from "../pb_collapsible/_helper_functions"

type DrawerContextType = {
  onClose: () => void
} | null

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
  const [shouldRender, setShouldRender] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const { isOpenBreakpointOpen, isUserClosed, setIsUserClosed } = useBreakpoint(
    {
      openBreakpoint: breakpoint,
      closeBreakpoint: breakpoint,
      menuButtonID,
    }
  )

  const modalIsOpened =
    (isOpenBreakpointOpen && !isUserClosed) || menuButtonOpened || opened

  // const { animationState, isVisible } = useDrawerAnimation(modalIsOpened)  

  // Replace useDrawerAnimation with our new animation logic
  useEffect(() => {
    console.log("animationState")
    if (modalIsOpened) {
      // Step 1: Mount component
      setShouldRender(true)

      // Step 2: Measure height and start animation
      const timer = setTimeout(() => {
        if (drawerRef.current) {
          const height = drawerRef.current.scrollHeight;
          drawerRef.current.style.setProperty('--drawer-height', `${height}px`);
        }
        setIsAnimating(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      // Step 3: Start closing animation
      setIsAnimating(false)

      // Step 4: Unmount after animation completes
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 250) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [modalIsOpened])

  // Remove the showElement/hideElement effect since we're handling visibility with CSS
  useEffect(() => {
    if (drawerRef.current && modalIsOpened) {
      const height = drawerRef.current.scrollHeight;
      drawerRef.current.style.setProperty('--drawer-height', `${height}px`);
    }
  }, [modalIsOpened])

  // Handle menu button click
  useEffect(() => {
    console.log("menuButtonID")
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
      "drawer_border-full": border === "full",
      "drawer_border-right": border === "right",
      "drawer_border-left": border === "left",
      pb_drawer_within_element: withinElement,
      pb_drawer_collapsing: shouldRender && !isAnimating,
      pb_drawer_after_open: isAnimating,
      pb_drawer_before_close: !isAnimating && shouldRender,
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
      pb_drawer_overlay_after_open: isAnimating,
      pb_drawer_overlay_before_close: !isAnimating && shouldRender,
    }
  )

  const api = {
    onClose: () => {
      console.log("onClose")
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
      }}
    >
      {children}
    </div>
  )

  // Step 5: Only render when shouldRender is true
  if (!shouldRender) return null

  return (
    <DrawerContext.Provider value={api as DrawerContextType}>
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
    </DrawerContext.Provider>
  )
}

export default Drawer
