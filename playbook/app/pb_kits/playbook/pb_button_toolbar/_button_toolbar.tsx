import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import { globalProps } from '../utilities/globalProps'

type ButtonToolbarProps = {
  aria?: {[key: string]: string},
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  connected?: boolean,
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  onClick?: React.MouseEventHandler<HTMLSpanElement>,
  orientation?: "horizontal" | "vertical",
  text?: string,
 variant?: "primary" | "secondary",
}

const ButtonToolbar  = (props: ButtonToolbarProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    id,
    orientation = 'horizontal',
    text,
    variant = 'primary',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const classes = classnames(
    buildCss('pb_button_toolbar_kit', orientation, variant),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {children || text}
    </div>
  )
}

export default ButtonToolbar
