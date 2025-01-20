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
  triggerId?: string
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
    triggerId,
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
      triggerId,
    }
  )

  const modalIsOpened =
    (isOpenBreakpointOpen && !isUserClosed) || menuButtonOpened || opened

  // const { animationState, isVisible } = useDrawerAnimation(modalIsOpened)  


  useEffect(() => {
    if (withinElement) return;

    const sizeMap: Record<DrawerProps["size"], string> = {
      xl: "365px",
      lg: "300px",
      md: "250px",
      sm: "200px",
      xs: "64px",
    };
    const body = document.querySelector("body");
    if (modalIsOpened && behavior === "push" && body) {
      if (placement === "left") {
        body.style.cssText = `margin-left: ${sizeMap[size]} !important; margin-right: '' !important;`;
      } else if (placement === "right") {
        body.style.cssText = `margin-right: ${sizeMap[size]} !important; margin-left: '' !important;`;
      }

      body.classList.add("PBDrawer__Body--open");
    } else if (body) {
      if (body.classList.contains("PBDrawer__Body--open")) {
        body.classList.add("PBDrawer__Body--close");
      }
      body.style.cssText = ""; // Clear the styles when modal is closed or behavior is not 'push'
      body.classList.remove("PBDrawer__Body--open");
    }
  }, [modalIsOpened, behavior, placement, size, withinElement]);

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
    console.log("triggerId")
    if (triggerId) {
      const menuButton = document.getElementById(triggerId)
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
  }, [triggerId, modalIsOpened])

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
    !overlay && "no-background",
    {
      pb_drawer_overlay_after_open: isAnimating,
      pb_drawer_overlay_before_close: !isAnimating && shouldRender,
    }
  )

  const api = {
    onClose: () => {
      console.log("onClose")
      if (triggerId) {
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
