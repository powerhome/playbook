/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import Modal from 'react-modal'
import { Button, Flex, SectionSeparator } from '../'
import { DialogHeader } from './_dialog_header'

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
  size?: "sm" | "md" | "lg" | "content",
  text?: string,
  title?: string,
}

export const DialogContext = React.createContext()

// Body component
const DialogBody = (props: DialogBodyProps) => {
  const { children, padding = 'sm', className } = props
  const bodyCSS = buildCss('dialog_body')
  const bodySpacing = globalProps(props, { padding })

  return (
    <div className={classnames(bodyCSS, bodySpacing, className)}>
      {children}
    </div>
  )
}

// Footer component
const DialogFooter = (props: DialogFooterProps) => {
  const {
    children,
    padding = 'sm',
    className,
    spacing = 'between',
    separator = false,
  } = props
  const footerCSS = buildCss('dialog_footer')
  const footerSpacing = globalProps(props, { padding })

  return (
    <>
      <If condition={separator}>
        <SectionSeparator />
      </If>
      <Flex
          className={classnames(footerCSS, footerSpacing, className)}
          spacing={spacing}
      >
        {children}
      </Flex>
    </>
  )
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
    text,
    title,
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const dialogClassNames = {
    base: classnames('dialog', buildCss('dialog', size)),
    afterOpen: 'dialog_after_open',
    beforeClose: 'dialog_before_close',
  }

  const overlayClassNames = {
    base: 'dialog_overlay',
    afterOpen: 'dialog_overlay_after_open',
    beforeClose: 'dialog_overlay_before_close',
  }

  const classes = classnames(
    buildCss('pb_dialog'),
    globalProps(props),
    className
  )

  const api = {
    onClose,
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
            isOpen={opened}
            onRequestClose={close}
            overlayClassName={overlayClassNames}
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
