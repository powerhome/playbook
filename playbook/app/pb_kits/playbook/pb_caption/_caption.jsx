/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type CaptionProps = {
  aria?: object,
  className?: string,
  children: array<React.ReactNode> | React.ReactNode,
  data?: object,
  id?: string,
  size?: "xs" | "sm" | "md" | "lg" | "xl",
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "caption",
  text?: string,
  variant?: null | "link",
  color?: "default" | "link" | "light",
};

const Caption = (props: CaptionProps) => {
  const {
    aria = {},
    className,
    children,
    color,
    data = {},
    id,
    size = 'md',
    tag = 'div',
    text,
    variant = null,
  } = props
  const tagOptions = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'div',
    'caption',
  ]
  const Tag = tagOptions.includes(tag) ? tag : 'div'

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_caption_kit', size, variant, color),
    globalProps(props),
    className,
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
