import React, { useState, useEffect } from "react";
import classnames from "classnames";

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../utilities/props";
import { globalProps, globalInlineProps } from "../utilities/globalProps";

import { DialogContext } from "../pb_dialog/_dialog_context";

type DrawerProps = {
  aria?: { [key: string]: string };
  behavior?: "floating" | "push";
  border?: "full" | "none" | "right" | "left";
  breakpoint?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode | React.ReactNode[] | string;
  className?: string;
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  fullHeight?: boolean;
  onClose?: () => void;
  opened: boolean;
  overlay: boolean;
  placement?: "left" | "right";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  text?: string;
  trigger?: string;
};

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
    size = "md",
    children,
    fullHeight = false,
    opened,
    onClose,
    overlay = true,
    placement = "left",
    trigger,
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

  const dynamicInlineProps = globalInlineProps(props)

  const [triggerOpened, setTriggerOpened] = useState(false);

  const breakpointWidths: Record<DrawerProps["breakpoint"], number> = {
    none: 0,
    xs: 575,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
  };

  // State to manage opening the drawer based on breakpoint
  const [isBreakpointOpen, setIsBreakpointOpen] = useState(false);

  useEffect(() => {
    if (breakpoint === "none") return;

    const handleResize = () => {
      const width = window.innerWidth;
      const breakpointWidth = breakpointWidths[breakpoint];

      if (width <= breakpointWidth) {
        setIsBreakpointOpen(true);
      } else {
        setIsBreakpointOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handler once on mount to set initial state
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  const modalIsOpened = trigger ? triggerOpened : opened || isBreakpointOpen;

  const [animationState, setAnimationState] = useState("");

  useEffect(() => {
    if (modalIsOpened) {
      setAnimationState("afterOpen");
    } else if (!modalIsOpened && animationState === "afterOpen") {
      setAnimationState("beforeClose");
      setTimeout(() => {
        setAnimationState("");
      }, 200); // closeTimeoutMS
    }
  }, [modalIsOpened]);

  const isModalVisible = modalIsOpened || animationState === "beforeClose";

  useEffect(() => {
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
  }, [modalIsOpened, behavior, placement, size]);

  const api = {
    onClose: trigger
      ? function () {
          setTriggerOpened(false);
        }
      : onClose,
  };

  return (
    <DialogContext.Provider value={api}>
      <div
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classes}
          style={dynamicInlineProps}
      >
          {isModalVisible && (
            <div
                className={classnames(overlayClassNames.base, {
              [overlayClassNames.afterOpen]: animationState === "afterOpen",
              [overlayClassNames.beforeClose]: animationState === "beforeClose",
            })}
                id={id}
                onClick={overlay ? onClose : undefined}
            >
            <div
                className={classnames(drawerClassNames.base, {
              [drawerClassNames.afterOpen]: animationState === "afterOpen",
              [drawerClassNames.beforeClose]: animationState === "beforeClose",
            })}
                onClick={(e) => e.stopPropagation()}
            >
            {children}
            </div>
            </div>
          )}
          </div>
    </DialogContext.Provider>
  );
};

export default Drawer;
