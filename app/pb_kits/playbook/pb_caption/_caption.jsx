/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type CaptionProps = {
  aria?: object,
  className?: String,
  children: Array<React.ReactNode> | React.ReactNode,
  data?: object,
  id?: String,
  size?: "xs" | "sm" | "md" | "lg" | "xl",
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div",
  text?: String,
}

const Caption = (props: CaptionProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    id,
    size = 'md',
    tag = 'div',
    text,
  } = props
  const Tag = `${tag}`

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_caption_kit', size),
    className,
    globalProps(props)
  )

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      {text || children}
    </Tag>
  )
}

export default Caption
