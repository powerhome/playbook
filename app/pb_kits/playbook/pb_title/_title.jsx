/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type TitleProps = {
  aria?: object,
  className?: String,
  children?: Array<React.ReactNode> | React.ReactNode,
  dark?: Boolean,
  data?: object,
  id?: String,
  size?: 1 | 2 | 3 | 4,
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span",
  text?: String,
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
    text } = props

  const themeStyle = dark === true ? '_dark' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_title_kit', size, themeStyle), className, spacing(props))
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
