import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import Modal from "react-modal";

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

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
  const containsPrefix = ['p_', 'pb_', 'pt_', 'pl_', 'pr_', 'px_', 'py_'].some((prefix) =>
    globalPropsString.includes(prefix)
  );

  // If none of the prefixes are found, append 'p_sm' to the string
  if (!containsPrefix) {
    globalPropsString += ' p_sm';
  }

  const drawerClassNames = {
    base: `${classnames(
      "pb_drawer",
      buildCss("pb_drawer", size, placement),
      {
        "drawer_border_full": border === "full",
        "drawer_border_right": border === "right",
        "drawer_border_left": border === "left",
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
    base: `pb_drawer${overlay ? '_overlay' : '_no_overlay'} ${fullHeight !== null && fullHeightClassNames()} ${!overlay ? 'no-background' : ''}`,
    afterOpen: "pb_drawer_overlay_after_open",
    beforeClose: "pb_drawer_overlay_before_close",
  };

  const classes = classnames(
    buildCss("pb_drawer_wrapper"),
    className
  );

const [triggerOpened, setTriggerOpened] = useState(false);
const [modalIsOpened, setModalIsOpened] = useState(trigger ? triggerOpened : opened);

const breakpointValues = {
  xs: 575,
  sm: 767,
  md: 991,
  lg: 1199,
  xl: 1200,
};

const handleResize = useCallback(() => {
  const width = window.innerWidth;

  if (breakpoint !== 'none') {
    if (width <= breakpointValues.xs) {
      if (breakpoint === 'sm') {
        setModalIsOpened(false); // Update the state instead of reassigning
      }
    } else if (width <= breakpointValues.sm) {
      if (breakpoint === 'sm') {
        setModalIsOpened(true); // Update the state instead of reassigning
      }
    } else if (width <= breakpointValues.md) {
      if (breakpoint === 'sm') {
        setModalIsOpened(false); // Update the state instead of reassigning
      }
    } else if (width <= breakpointValues.lg) {
      if (breakpoint === 'sm') {
        setModalIsOpened(false); // Update the state instead of reassigning
      }
    } else if (width > breakpointValues.lg) {
      if (breakpoint === 'sm') {
        setModalIsOpened(false); // Update the state instead of reassigning
      }
    }
  }
}, [breakpoint, breakpointValues]);

// Optionally use useEffect to trigger handleResize on window resize
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [handleResize]);

  useEffect(() => {
    const sizeMap: Record<DrawerProps['size'], string> = {
      xl: '365px',
      lg: '300px',
      md: '250px',
      sm: '200px',
      xs: '64px',
    };
    const body = document.querySelector('body');

    if (modalIsOpened && behavior === 'push' && body) {
      if (placement === 'left') {
        body.style.cssText = `margin-left: ${sizeMap[size]} !important; margin-right: '' !important;`;
      } else if (placement === 'right') {
        body.style.cssText = `margin-right: ${sizeMap[size]} !important; margin-left: '' !important;`;
      }

      body.classList.add('ReactModal__Body--open');
    } else if (body) {
      body.style.cssText = ''; // Clear the styles when modal is closed or behavior is not 'push'
      body.classList.remove('ReactModal__Body--open');
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
      >
        <Modal
            ariaHideApp={false}
            className={drawerClassNames}
            closeTimeoutMS={200}
            contentLabel="Minimal Modal Example"
            id={id}
            isOpen={modalIsOpened}
            onRequestClose={onClose}
            overlayClassName={overlayClassNames}
            shouldCloseOnOverlayClick={overlay}
        >
          <>
            {children}
          </>
        </Modal>
      </div>
    </DialogContext.Provider>
  );
};

export default Drawer;
