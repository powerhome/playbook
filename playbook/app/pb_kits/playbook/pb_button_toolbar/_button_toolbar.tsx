/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { globalProps } from '../utilities/globalProps'

type ButtonToolbarProps = {
  aria?: {[key: string]: string},
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  connected?: boolean,
  data?: object,
  id?: string,
  onClick?: React.MouseEventHandler<HTMLSpanElement>,
  orientation?: "horizontal" | "vertical",
  text?: string,
 variant?: "primary" | "secondary",
}

const ButtonToolbar  = (props: ButtonToolbarProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    id,
    orientation = 'horizontal',
    text,
    variant = 'primary',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(
    buildCss('pb_button_toolbar_kit', orientation, variant),
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
