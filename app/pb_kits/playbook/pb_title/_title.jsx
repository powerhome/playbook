/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type TitleProps = {
  aria?: object,
  children?: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  dark?: Boolean,
  data?: object,
  id?: String,
  size?: 1 | 2 | 3 | 4,
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div",
  text?: String,
  variant?: Boolean,
}

const Title = (props: TitleProps) => {
  const {
    aria = {},
    children,
    className,
    dark = false,
    data = {},
    id,
    size = 3,
    tag = 'h3',
    text,
    variant = false,
  } = props

  const themeStyle = dark === true ? 'dark' : ''
  const variantStyle = variant === true ? 'primary' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_title_kit', size, themeStyle, variantStyle), className, spacing(props))
  const Tag = `${tag}`

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {text || children}
    </Tag>
  )
}

export default Title
