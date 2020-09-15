/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type ButtonToolbarProps = {
  aria?: object,
  children?: array<React.ReactChild>,
  className?: string,
  connected?: boolean,
  data?: object,
  id?: string,
  onClick?: EventHandler,
  orientation?: "horizontal" | "vertical",
  text?: string,
  variant?: string,
}

const ButtonToolbar  = (props: ButtonToolbarProps) => {
  const {
    aria = {},
    children,
    className,
    connected = false,
    data = {},
    id,
    orientation = 'horizontal',
    text,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(
    buildCss('pb_button_toolbar_kit', orientation, { connected: connected }),
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
      {children || text}
    </div>
  )
}

export default ButtonToolbar
