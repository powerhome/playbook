/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/no-multi-comp */

import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Modal from "react-modal";

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

import Body from "../pb_body/_body";
import Button from "../pb_button/_button";
import DialogHeader from "./child_kits/_dialog_header";
import DialogFooter from "./child_kits/_dialog_footer";
import DialogBody from "./child_kits/_dialog_body";
import Flex from "../pb_flex/_flex";
import Title from "../pb_title/_title";
import { DialogContext } from "./_dialog_context";

type DialogProps = {
  aria?: { [key: string]: string };
  behavior?: "floating" | "push";
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
  overlay: boolean;
  portalClassName?: string;
  placement?: "left" | "center" | "right";
  shouldCloseOnOverlayClick: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" 
  status?: "info" | "caution" | "delete" | "error" | "success";
  text?: string;
  title?: string;
  trigger?: string;
};

const Dialog = (props: DialogProps): React.ReactElement => {
  const {
    aria = {},
    behavior = "floating",
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
    overlay = true,
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

  let globalPropsString: string = globalProps(props);

  // Check if the string contains any of the prefixes
  const containsPrefix = ['p_', 'pb_', 'pt_', 'pl_', 'pr_', 'px_', 'py_'].some((prefix) =>
    globalPropsString.includes(prefix)
  );

  const containsBR = ['border_radius'].some((prefix) =>
    globalPropsString.includes(prefix)
  );

  // If none of the prefixes are found, append 'p_sm' to the string
  if (!containsPrefix) {
    globalPropsString += ' p_sm';
  }

  if (!containsBR) {
    globalPropsString += ' border_radius_none';
  }

  const dialogClassNames = {
    base: `${classnames("pb_dialog", buildCss("pb_dialog", size, placement))} ${globalPropsString}`,
    afterOpen: "pb_dialog_after_open",
    beforeClose: "pb_dialog_before_close",
  };

  const fullHeightClassNames = () => {
    if(!fullHeight) return null
    return `full_height_${placement}`
  }

  const overlayClassNames = {
    base: `pb_dialog_overlay ${fullHeight !== null && fullHeightClassNames()} ${!overlay ? 'no-background' : ''}`,
    afterOpen: "pb_dialog_overlay_after_open",
    beforeClose: "pb_dialog_overlay_before_close",
  };

  const classes = classnames(
    buildCss("pb_dialog_wrapper"),
    className
  );


  const [triggerOpened, setTriggerOpened] = useState(false),
    modalIsOpened = trigger ? triggerOpened : opened;

  useEffect(() => {

    const sizeMap: Record<Props['size'], string> = {
      lg: '300px',
      md: '250px',
      sm: '200px',
      xl: '365px',
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
      body.style.cssText = ''; // Clear the styles when modal is closed or behavior is not 'floating'
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
            className={dialogClassNames}
            closeTimeoutMS={200}
            contentLabel="Minimal Modal Example"
            id={id}
            isOpen={modalIsOpened}
            onRequestClose={onClose}
            overlayClassName={overlayClassNames}
            portalClassName={portalClassName}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            style={{ marginLeft: "auto" }}
        >
          <>
            {title && !status ? <Dialog.Header>{title}</Dialog.Header> : null}
            {!status && text ? <Dialog.Body>{text}</Dialog.Body> : null}
            {status && (
              <Dialog.Body
                  className="dialog_status_text_align"
                  padding="md"
              >
                <Flex align="center"
                    orientation="column"
                >
                  <Title marginTop="sm"
                      size={3}
                  >
                    {title}
                  </Title>
                  <Body marginTop="xs"
                      text={text}
                  />
                </Flex>
              </Dialog.Body>
            )}
            {cancelButton && confirmButton ? (
              <Dialog.Footer>
                  <Button
                      htmlType="button"
                      loading={loading}
                      onClick={onConfirm}
                      variant="primary"
                  >
                    {confirmButton}
                  </Button>
                  <Button
                      htmlType="button"
                      id="cancel-button"
                      onClick={onCancel}
                      variant="link"
                  >
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
