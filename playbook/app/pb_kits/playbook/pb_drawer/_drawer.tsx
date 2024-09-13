/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/no-multi-comp */

import React, { useState } from "react";
import classnames from "classnames";
import Modal from "react-modal";

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

import Body from "../pb_body/_body";
import Button from "../pb_button/_button";
import DialogHeader from "../pb_dialog/child_kits/_dialog_header";
import DialogFooter from "../pb_dialog/child_kits/_dialog_footer";
import DialogBody from "../pb_dialog/child_kits/_dialog_body";
import Flex from "../pb_flex/_flex";
import IconCircle from "../pb_icon_circle/_icon_circle";
import Title from "../pb_title/_title";
import { DialogContext } from "../pb_dialog/_dialog_context";

type DrawerProps = {
  aria?: { [key: string]: string };
  cancelButton?: string;
  children: React.ReactNode | React.ReactNode[] | string;
  className?: string;
  closeable: boolean;
  confirmButton?: string;
  data?: {[key: string]: string},
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  fullHeight?: boolean;
  loading?: boolean;
  onCancel?: () => void;
  onChange?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  opened: boolean;
  portalClassName?: string;
  placement?: "left" | "center" | "right";
  shouldCloseOnOverlayClick: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "status_size" | "content";
  status?: "info" | "caution" | "delete" | "error" | "success";
  text?: string;
  title?: string;
  trigger?: string;
};

const Drawer = (props: DrawerProps): React.ReactElement => {
  const {
    aria = {},
    cancelButton,
    confirmButton,
    className,
    data = {},
    htmlOptions = {},
    id,
    size = "md",
    children,
    loading = false,
    fullHeight = false,
    opened,
    onCancel,
    onConfirm,
    onClose,
    placement = "center",
    portalClassName,
    shouldCloseOnOverlayClick = true,
    status,
    text,
    title,
    trigger,
  } = props;
  const ariaProps = buildAriaProps(aria);
   const dataProps = buildDataProps(data)
   const htmlProps = buildHtmlProps(htmlOptions);
  const drawerClassNames = {
    base: classnames("pb_drawer", buildCss("pb_drawer", size, placement)),
    afterOpen: "pb_drawer_after_open",
    beforeClose: "pb_drawer_before_close",
  };

  const fullHeightClassNames = () => {
    if(!fullHeight) return null
    if(size === "xl") return `full_height_center`
    return `full_height_${placement}`
  }

  const overlayClassNames = {
    base: `pb_drawer_overlay ${fullHeight !== null && fullHeightClassNames() }`,
    afterOpen: "pb_drawer_overlay_after_open",
    beforeClose: "pb_drawer_overlay_before_close",
  };

  const classes = classnames(
    buildCss("pb_drawer_wrapper"),
    globalProps(props),
    className
  );

  const [triggerOpened, setTriggerOpened] = useState(false),
    modalIsOpened = trigger ? triggerOpened : opened;

  const api = {
    onClose: trigger
      ? function () {
          setTriggerOpened(false);
        }
      : onClose,
  };

  if (trigger) {
    const modalTrigger = document.querySelector(trigger);
    modalTrigger.addEventListener(
      "click",
      () => {
        setTriggerOpened(true);
        document
          .querySelector("#cancel-button")
          .addEventListener("click", () => {
            setTriggerOpened(false);
          });
      },
      { once: true }
    );
  }

  type sweetAlertStatusProps = {
    [key: string]: {
      icon: string,
      variant: "default" | "yellow" | "red" | "green" | "royal" | "blue" | "purple" | "teal",
      size: "sm" | "md" | "lg" | "base" | "xs" | "xl";
    }
  }

  const sweetAlertStatus: sweetAlertStatusProps = {
    default: {
      icon: "exclamation-circle",
      variant: "default",
      size: "lg",
    },
    info: {
      icon: "info-circle",
      variant: "default",
      size: "lg",
    },
    caution: {
      icon: "exclamation-triangle",
      variant: "yellow",
      size: "lg",
    },
    delete: {
      icon: "trash-alt",
      variant: "red",
      size: "lg",
    },
    error: {
      icon: "times-circle",
      variant: "red",
      size: "lg",
    },
    success: {
      icon: "check-circle",
      variant: "green",
      size: "lg",
    },
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
            portalClassName={portalClassName}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick && !loading}
        >
          <>
            {title && !status ? <Drawer.Header>{title}</Drawer.Header> : null}
            {!status && text ? <Drawer.Body>{text}</Drawer.Body> : null}
            {status && (
              <Drawer.Body
                  className="drawer_status_text_align"
                  padding="md"
              >
                <Flex align="center"
                    orientation="column"
                >
                  <IconCircle
                      icon={sweetAlertStatus[status].icon}
                      size={sweetAlertStatus[status].size}
                      variant={sweetAlertStatus[status].variant}
                  />
                  <Title marginTop="sm"
                      size={3}
                  >
                    {title}
                  </Title>
                  <Body marginTop="xs"
                      text={text}
                  />
                </Flex>
              </Drawer.Body>
            )}
            {cancelButton && confirmButton ? (
              <Drawer.Footer>
                  <Button
                      disabled={loading}
                      htmlType="button"
                      loading={loading}
                      onClick={onConfirm}
                      variant="primary"
                  >
                    {confirmButton}
                  </Button>
                  <Button
                      disabled={loading}
                      htmlType="button"
                      id="cancel-button"
                      onClick={onCancel}
                      variant="link"
                  >
                    {cancelButton}
                  </Button>
              </Drawer.Footer>
            ) : null}
            {children}
          </>
        </Modal>
      </div>
    </DialogContext.Provider>
  );
};
Drawer.Header = DialogHeader;
Drawer.Body = DialogBody;
Drawer.Footer = DialogFooter;

export default Drawer;
