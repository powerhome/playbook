/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'

type CaptionProps = {
  className?: String,
  children: Array<React.ReactNode> | React.ReactNode,
  dark?: Boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  tag: String,
  text: String,
}

const Caption = ({
  className,
  children,
  dark = false,
  size = 'md',
  tag = 'div',
  text,
}: CaptionProps) => {
  const Tag = `${tag}`

  const css = classnames(className, buildCss('pb_caption_kit', size, {
    'dark': dark,
  }))

  return (
    <Tag className={css}>
      {text || children}
    </Tag>
  )
}

export default Caption
