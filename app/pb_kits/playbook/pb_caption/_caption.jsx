/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type CaptionProps = {
  className?: String,
  children: Array<React.ReactNode> | React.ReactNode,
  dark?: Boolean,
  size?: "xs" | "sm" | "md" | "lg" | "xl",
  tag: String,
  text: String,
}

const Caption = (props: CaptionProps) => {
  const {
    className,
    children,
    dark = false,
    size = 'md',
    tag = 'div',
    text,
  } = props
  const Tag = `${tag}`

  const css = classnames(
    buildCss('pb_caption_kit', size, {
      dark: dark,
    }),
    className,
    spacing(props)
  )

  return <Tag className={css}>{text || children}</Tag>
}

export default Caption
