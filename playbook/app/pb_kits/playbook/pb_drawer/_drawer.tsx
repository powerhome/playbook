import React, { useState, useEffect } from "react";
import classnames from "classnames";

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

import { DialogContext } from "../pb_dialog/_dialog_context";

type DrawerProps = {
  aria?: { [key: string]: string };
  behavior?: "floating" | "push";
  border?: "full" | "none" | "right" | "left";
  openBreakpoint?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  closeBreakpoint?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode | React.ReactNode[] | string;
  className?: string;
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  fullHeight?: boolean;
  menuButtonID?: string;
  onClose?: () => void;
  opened: boolean;
  overlay: boolean;
  placement?: "left" | "right";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  text?: string;
  withinElement?: boolean;
};

const Drawer = (props: DrawerProps): React.ReactElement => {
  const {
    aria = {},
    behavior = "floating",
    border = "none",
    openBreakpoint = "none",
    closeBreakpoint = "none",
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
  } = props;
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);

  let globalPropsString: string = globalProps(props);

  // Check if the string contains any of the prefixes
  const containsPrefix = [
    "p_",
    "pb_",
    "pt_",
    "pl_",
    "pr_",
    "px_",
    "py_",
  ].some((prefix) => globalPropsString.includes(prefix));

  // If none of the prefixes are found, append 'p_sm' to the string
  if (!containsPrefix) {
    globalPropsString += " p_sm";
  }

  const drawerClassNames = {
    base: `${classnames(
      "pb_drawer",
      buildCss("pb_drawer", size, placement),
      {
        drawer_border_full: border === "full",
        drawer_border_right: border === "right",
        drawer_border_left: border === "left",
        pb_drawer_within_element: withinElement,
      }
    )} ${globalPropsString}`,
    afterOpen: "pb_drawer_after_open",
    beforeClose: "pb_drawer_before_close",
  };

  const fullHeightClassNames = () => {
    if (!fullHeight) return null;
    return `full_height_${placement}`;
  };

  const overlayClassNames = {
    base: `pb_drawer${overlay ? "_overlay" : "_no_overlay"} ${
      fullHeight !== null && fullHeightClassNames()
    } ${!overlay ? "no-background" : ""}`,
    afterOpen: "pb_drawer_overlay_after_open",
    beforeClose: "pb_drawer_overlay_before_close",
  };

  const classes = classnames(buildCss("pb_drawer_wrapper"), className);

  const [menuButtonOpened, setMenuButtonOpened] = useState(false);

  const breakpointWidths: Record<DrawerProps["openBreakpoint"], number> = {
    none: 0,
    xs: 575,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
  };

  const breakpointValues = { 
    none: 0,
    xs: 575,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
  }

  const [isOpenBreakpointOpen, setIsOpenBreakpointOpen] = useState(false);
  const [isUserClosed, setIsUserClosed] = useState(false);

  useEffect(() => {
    if (openBreakpoint === "none") return;

    const handleResize = () => {
      const width = window.innerWidth;
      const openBreakpointWidth = breakpointWidths[openBreakpoint];

      if (width <= openBreakpointWidth) {
        setIsOpenBreakpointOpen(true);
      } else {
        setIsOpenBreakpointOpen(false);
        setIsUserClosed(false); // Reset when the breakpoint condition changes
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handler once on mount to set initial state
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [openBreakpoint]);

  useEffect(() => {
    if (closeBreakpoint === "none") return;

   const handleResize = () => { 
    const width = window.innerWidth;
    if (width >= breakpointValues[closeBreakpoint]) {
      setIsOpenBreakpointOpen(true);
    } else {
      setIsOpenBreakpointOpen(false);
    }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    
  }, [closeBreakpoint]);

  // Reset isUserClosed when isBreakpointOpen changes
  useEffect(() => {
    if (isOpenBreakpointOpen) {
      setIsUserClosed(false);
    }
  }, [isOpenBreakpointOpen]);

  const modalIsOpened =
    (isOpenBreakpointOpen && !isUserClosed) || menuButtonOpened || opened;

  const [animationState, setAnimationState] = useState("");

  useEffect(() => {
    if (modalIsOpened) {
      setAnimationState("afterOpen");
    } else if (!modalIsOpened && animationState === "afterOpen") {
      setAnimationState("beforeClose");
      setTimeout(() => {
        setAnimationState("");
      }, 200); 
    }
  }, [modalIsOpened]);

  const isModalVisible = modalIsOpened || animationState === "beforeClose";

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

  const api = {
    onClose: () => {
      if (menuButtonID) {
        setMenuButtonOpened(false);
      }
      setIsUserClosed(true);
      if (onClose) {
        onClose();
      }
    },
  };

  useEffect(() => {
    if (menuButtonID) {
      const menuButton = document.getElementById(menuButtonID);
      if (menuButton) {
        const handleMenuButtonClick = () => {
          if (modalIsOpened) {
            // Drawer is open, close it
            setMenuButtonOpened(false);
            setIsUserClosed(true);
          } else {
            // Drawer is closed, open it
            setMenuButtonOpened(true);
            setIsUserClosed(false);
          }
        };
        menuButton.addEventListener("click", handleMenuButtonClick);
        return () => {
          menuButton.removeEventListener("click", handleMenuButtonClick);
        };
      }
    }
  }, [menuButtonID, modalIsOpened]);

  return (
    <DialogContext.Provider value={api}>
      {withinElement ? (
        isModalVisible && (
          <div
              {...ariaProps}
              {...dataProps}
              {...htmlProps}
              className={classnames(drawerClassNames.base, {
              [drawerClassNames.afterOpen]:
                animationState === "afterOpen",
              [drawerClassNames.beforeClose]:
                animationState === "beforeClose",
            })}
              id={id}
              onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        )
      ) : (
        <div
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
        >
          {isModalVisible && (
            <div
                className={classnames(overlayClassNames.base, {
                [overlayClassNames.afterOpen]:
                  animationState === "afterOpen",
                [overlayClassNames.beforeClose]:
                  animationState === "beforeClose",
              })}
                id={id}
                onClick={overlay ? api.onClose : undefined}
            >
              <div
                  className={classnames(drawerClassNames.base, {
                  [drawerClassNames.afterOpen]:
                    animationState === "afterOpen",
                  [drawerClassNames.beforeClose]:
                    animationState === "beforeClose",
                })}
                  onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </div>
          )}
        </div>
      )}
    </DialogContext.Provider>
  );
};

export default Drawer;
