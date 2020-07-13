/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { spacing } from '../utilities/spacing.js'

type ButtonGroupProps = {
  aria?: object,
  children?: Array<React.ReactChild>,
  className?: String,
  connected?: Boolean,
  data?: object,
  id?: String,
  onClick?: EventHandler,
  orientation?: "horizontal" | "vertical",
  text?: String,
  variant?: String,
}

const ButtonGroup  = (props: ButtonGroupProps) => {
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

  const classes = classnames(buildCss('pb_button_group_kit', orientation, { connected: connected }), className, spacing(props))

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

export default ButtonGroup
