/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import Modal from 'react-modal'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body_body'
import Button from '../pb_button/_button'
import DialogHeader  from './child_kits/_dialog_header'
import DialogFooter from './child_kits/_dialog_footer'
import DialogBody from './child_kits/_dialog_body'
import Flex from '../pb_flex/_flex'
import IconCircle from '../pb_icon_circle/_icon_circle'
import Title from '../pb_title/_title'
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
  loading?: boolean,
  onCancel?: () => void,
  onChange?: () => void,
  onClose?: () => void,
  onConfirm?: () => void,
  opened: boolean,
  portalClassName?: string,
  shouldCloseOnOverlayClick: boolean,
  size?: "sm" | "md" | "lg" | "content",
  status?: "info" | "caution" | "delete" | "error" | "success",
  sweetAlert?: "default" | "dismiss" | "compact" | "stacked",
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
    loading = false,
    opened,
    onCancel = () => {},
    onConfirm = () => {},
    onClose = () => {},
    portalClassName,
    shouldCloseOnOverlayClick = true,
    status,
    sweetAlert = null,
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

  const [triggerOpened, setTriggerOpened] = useState(false),
  modalIsOpened = trigger ? triggerOpened : opened

  const api = {
    onClose: trigger ? function(){
      setTriggerOpened(false)
    } : onClose,
  }

  if (trigger) {
    const modalTrigger = document.querySelector(trigger)
    modalTrigger.addEventListener('click', () => {
      setTriggerOpened(true)
      document.querySelector('#cancel-button').addEventListener('click', () => {
        setTriggerOpened(false)
      })
    }, { once: true })
  }

  // const sweetAlertStyle = {
  //   default: {
  //     size: "md",
  //   },
  //   dismiss: {
  //     size: "sm",
  //   },
  //   compact: {
  //     size: "sm",
  //   },
  //   stacked: {
  //     size: "sm",
  //   },
  // }

  const sweetAlertStatus = {
    default: {
      icon: "exclamation-circle",
      variant: "default",
    },
    caution: {
      icon: "triangle-warning",
      variant: "yellow",
    },
    delete: {
      icon: "trash",
      variant: "red",
    },
    error: {
      icon: "times-circle",
      variant: "red",
    },
    success: {
      icon: "check-circle",
      variant: "green",
    },
  }

  const DefaultModal = () => {
    return (
      <Modal
          ariaHideApp={false}
          className={dialogClassNames}
          closeTimeoutMS={200}
          contentLabel='Minimal Modal Example'
          id={id}
          isOpen={modalIsOpened}
          onRequestClose={onClose}
          overlayClassName={overlayClassNames}
          portalClassName={portalClassName}
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
            <Button loading={loading}
                onClick={onConfirm}>
              {confirmButton}
            </Button>
            <Button id='cancel-button'
                onClick={onCancel}
                variant='link'>
              {cancelButton}
            </Button>
          </Dialog.Footer>
        </If>
        {children}
      </Modal>
    )
  }

  return (
    <DialogContext.Provider value={api}>
      <div
          {...ariaProps}
          {...dataProps}
          className={classes}
      >
        { sweetAlert ? (
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
          <Dialog.Body>
              <Flex align='center'
                  orientation='column'>
                <IconCircle
                    icon={sweetAlertStatus[status].icon}
                    marginY='xs'
                    size='lg'
                    variant={sweetAlertStatus[status].variant}
                />
                <Title marginY='sm'
                    size={3}>
                  {title}
                </Title>
                <Body marginY='xs'
                    text={text} />
              </Flex>
            </Dialog.Body>
            <If condition={cancelButton && confirmButton}>
              <Dialog.Footer>
                <Button loading={loading}
                    onClick={onConfirm}>
                  {confirmButton}
                </Button>
                <Button id='cancel-button'
                    onClick={onCancel}
                    variant='link'>
                  {cancelButton}
                </Button>
              </Dialog.Footer>
            </If>
            {children}
          </Modal> ) : (
          <DefaultModal />
        )}
      </div>
    </DialogContext.Provider>
  )
}
Dialog.Header = DialogHeader
Dialog.Body = DialogBody
Dialog.Footer = DialogFooter

export default Dialog
