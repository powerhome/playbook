/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/no-multi-comp */

import React, { useState } from "react";
import classnames from "classnames";
import Modal from "react-modal";

import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

import Body from "../pb_body/_body";
import Button from "../pb_button/_button";
import DialogHeader from "./child_kits/_dialog_header";
import DialogFooter from "./child_kits/_dialog_footer";
import DialogBody from "./child_kits/_dialog_body";
import Flex from "../pb_flex/_flex";
import IconCircle from "../pb_icon_circle/_icon_circle";
import Title from "../pb_title/_title";
import { DialogContext } from "./_dialog_context";

type DialogProps = {
  aria?: { [key: string]: string };
  cancelButton?: string;
  children: React.ReactNode | React.ReactNode[] | string;
  className?: string;
  closeable: boolean;
  confirmButton?: string;
  data?: object;
  id?: string;
  loading?: boolean;
  onCancel?: () => void;
  onChange?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  opened: boolean;
  portalClassName?: string;
  shouldCloseOnOverlayClick: boolean;
  size?: "sm" | "md" | "lg" | "status_size" | "content";
  status?: "info" | "caution" | "delete" | "error" | "success";
  text?: string;
  title?: string;
  trigger?: string;
};

const Dialog = (props: DialogProps) => {
  const {
    aria = {},
    cancelButton,
    confirmButton,
    className,
    data = {},
    id,
    size = "md",
    children,
    loading = false,
    opened,
    onCancel = () => {},
    onConfirm = () => {},
    onClose = () => {},
    portalClassName,
    shouldCloseOnOverlayClick = true,
    status,
    text,
    title,
    trigger,
  } = props;
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const dialogClassNames = {
    base: classnames("pb_dialog", buildCss("pb_dialog", size)),
    afterOpen: "pb_dialog_after_open",
    beforeClose: "pb_dialog_before_close",
  };

  const overlayClassNames = {
    base: "pb_dialog_overlay",
    afterOpen: "pb_dialog_overlay_after_open",
    beforeClose: "pb_dialog_overlay_before_close",
  };

  const classes = classnames(
    buildCss("pb_dialog_wrapper"),
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
      <div {...ariaProps} {...dataProps} className={classes}>
        <Modal
          ariaHideApp={false}
          className={dialogClassNames}
          closeTimeoutMS={200}
          contentLabel="Minimal Modal Example"
          id={id}
          isOpen={modalIsOpened}
          onRequestClose={onClose}
          overlayClassName={overlayClassNames}
          portalClassName={portalClassName}
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
          <>
            {title && !status ? <Dialog.Header>{title}</Dialog.Header> : null}
            {!status && text ? <Dialog.Body>{text}</Dialog.Body> : null}
            {status && (
              <Dialog.Body padding="md">
                <Flex align="center" orientation="column">
                  <IconCircle
                    icon={sweetAlertStatus[status].icon}
                    size={sweetAlertStatus[status].size}
                    variant={sweetAlertStatus[status].variant}
                  />
                  <Title marginTop="sm" size={3}>
                    {title}
                  </Title>
                  <Body marginTop="xs" text={text} />
                </Flex>
              </Dialog.Body>
            )}
            {cancelButton && confirmButton ? (
              <Dialog.Footer>
                  <Button 
                    loading={loading} 
                    onClick={onConfirm} 
                    htmlType="button" 
                    variant="primary">
                    {confirmButton}
                  </Button>
                  <Button 
                    id="cancel-button" 
                    onClick={onCancel} 
                    variant="link" 
                    htmlType="button">
                    {cancelButton}
                  </Button>
              </Dialog.Footer>
            ) : null}
            {children}
          </>
        </Modal>
      </div>
    </DialogContext.Provider>
  );
};
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;

export default Dialog;
