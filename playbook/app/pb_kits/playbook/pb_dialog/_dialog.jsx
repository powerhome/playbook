/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import Modal from 'react-modal'
import { Flex, Icon, SectionSeparator } from '../'

type DialogProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  opened: boolean,
  size?: "sm" | "md" | "lg" | "content",
  children: array<React.ReactNode> | React.ReactNode | string,
}

// Header component
const Header = (props: DialogHeaderProps) => {
  const {
    children,
    className,
    padding = 'sm',
    spacing = 'between',
    closeable = true,
    onClick,
    separator = true,
  } = props
  const headerCSS = buildCss('dialog_header')
  const headerSpacing = globalProps(props, { padding })

  const CloseIcon = () => (
    <div
        className="dialog_close_icon"
        onClick={onClick}
    >
      <Icon
          fixedWidth
          icon="times"
      />
    </div>
  )

  return (
    <>
      <Flex
          className={classnames(headerCSS, headerSpacing, className)}
          spacing={spacing}
      >
        {children}
        <If condition={closeable}>
          <CloseIcon />
        </If>
      </Flex>
      <If condition={separator}>
        <SectionSeparator />
      </If>
    </>
  )
}

// Body component
const Body = (props: DialogBodyProps) => {
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
const Footer = (props: DialogFooterProps) => {
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
    className,
    data = {},
    id,
    size = 'md',
    children,
    opened,
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

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Modal
          ariaHideApp={false}
          className={dialogClassNames}
          closeTimeoutMS={400}
          contentLabel="Minimal Modal Example"
          isOpen={opened}
          onRequestClose={close}
          overlayClassName={overlayClassNames}
      >
        {children}
      </Modal>
    </div>
  )
}
Dialog.Header = Header
Dialog.Body = Body
Dialog.Footer = Footer

export default Dialog
