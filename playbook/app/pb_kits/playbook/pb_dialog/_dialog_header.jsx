/* @flow */

import React, { useContext } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Flex, SectionSeparator } from '../'
import { CloseIcon } from './_close_icon'
import { DialogContext } from './_dialog_context'

type DialogHeaderProps = {
  aria?: object,
  children: array<React.ReactNode> | React.ReactNode | string,
  className?: string,
  closeable: boolean,
  data?: object,
  id?: string,
  padding?: string,
  separator: boolean,
  spacing?: string,
  text?: string,
  title?: string,
}

const DialogHeader = (props: DialogHeaderProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    padding = 'sm',
    spacing = 'between',
    closeable = true,
    separator = true,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const api = useContext(DialogContext)
  const headerCSS = buildCss('dialog_header')
  const headerSpacing = globalProps(props, { padding })

  /* eslint-disable react/jsx-handler-names */

  return (
    <>
      <Flex
          {...ariaProps}
          {...dataProps}
          className={classnames(headerCSS, headerSpacing, className)}
          spacing={spacing}
      >
        {children}
        <If condition={closeable}>
          <CloseIcon
              className="close-icon"
              onClose={api.onClose}
          />
        </If>
      </Flex>
      <If condition={separator}>
        <SectionSeparator />
      </If>
    </>
  )
}

export default DialogHeader
