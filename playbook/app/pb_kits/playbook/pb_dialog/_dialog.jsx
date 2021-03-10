/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import Modal from 'react-modal'
import { Button } from '../'
import DialogHeader  from './child_kits/_dialog_header'
import DialogFooter from './child_kits/_dialog_footer'
import DialogBody from './child_kits/_dialog_body'
import { DialogContext } from './_dialog_context'

type DialogProps = {
  aria?: object,
  cancelButton?: string,
  children: array<React.ReactNode> | React.ReactNode | string,
  className?: string,
  closeable: boolean,
  confirmButton?: string,
  data?: object,
  id?: string,
  onCancel?: () => void,
  onChange?: () => void,
  onClose?: () => void,
  onConfirm?: () => void,
  opened: boolean,
  shouldCloseOnOverlayClick: boolean,
  size?: "sm" | "md" | "lg" | "content",
  text?: string,
  title?: string,
  trigger?: string
}

const Dialog = (props: DialogProps) => {
  const {
    aria = {},
    cancelButton,
    confirmButton,
    className,
    data = {},
    id,
    size = 'md',
    children,
    opened,
    onCancel = () => {},
    onConfirm = () => {},
    onClose = () => {},
    shouldCloseOnOverlayClick = true,
    text,
    title,
    trigger,
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const dialogClassNames = {
    base: classnames('pb_dialog', buildCss('pb_dialog', size)),
    afterOpen: 'pb_dialog_after_open',
    beforeClose: 'pb_dialog_before_close',
  }

  const overlayClassNames = {
    base: 'pb_dialog_overlay',
    afterOpen: 'pb_dialog_overlay_after_open',
    beforeClose: 'pb_dialog_overlay_before_close',
  }

  const classes = classnames(
    buildCss('pb_dialog_wrapper'),
    globalProps(props),
    className
  )

  const api = {
    onClose: trigger ? function(){
      setTriggerOpened(false)
    } : onClose,
  }

  const [triggerOpened, setTriggerOpened] = useState(false),
    modalIsOpened = trigger ? triggerOpened : opened

  if (trigger) {
    const modalTrigger = document.querySelector(trigger)
    modalTrigger.addEventListener('click', () => {
      setTriggerOpened(true)
      document.querySelector('#cancel-button').addEventListener('click', () => {
        setTriggerOpened(false)
      })
    }, { once: true })
  }

  return (
    <DialogContext.Provider value={api}>
      <div
          {...ariaProps}
          {...dataProps}
          className={classes}
          id={id}
      >
        <Modal
            ariaHideApp={false}
            className={dialogClassNames}
            closeTimeoutMS={200}
            contentLabel="Minimal Modal Example"
            isOpen={modalIsOpened}
            onRequestClose={onClose}
            overlayClassName={overlayClassNames}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
          <If condition={title}>
            <Dialog.Header>{title}</Dialog.Header>
          </If>
          <If condition={text}>
            <Dialog.Body>{text}</Dialog.Body>
          </If>

          <If condition={cancelButton && confirmButton}>
            <Dialog.Footer>
              <Button onClick={onConfirm}>{confirmButton}</Button>
              <Button
                  id="cancel-button"
                  onClick={onCancel}
                  variant="link"
              >
                {cancelButton}
              </Button>
            </Dialog.Footer>
          </If>

          {children}
        </Modal>
      </div>
    </DialogContext.Provider>
  )
}
Dialog.Header = DialogHeader
Dialog.Body = DialogBody
Dialog.Footer = DialogFooter

export default Dialog
