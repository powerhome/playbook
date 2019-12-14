/* @flow */

import React from 'react'
import classnames from 'classnames'

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

  const css = classnames([
    'pb_caption_kit' +
    `_${size}` +
    (dark === true ? '_dark' : ''),
    className,
  ])

  return (
    <Tag className={css} >
      {text || children}
    </Tag>
  )
}

export default Caption
