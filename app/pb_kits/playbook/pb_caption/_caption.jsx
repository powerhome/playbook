/* @flow */

import React from 'react'
import classnames from 'classnames'

type CaptionProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String | Array<String>,
  dark?: Boolean,
  large?: Boolean,
  tag: String,
  text: String,
}

const Caption = ({
  children,
  className,
  dark=false,
  large=false,
  tag='div',
  text,
}: CaptionProps) => {

  const Tag = `${tag}`

  return (
    <Tag
        className={classnames([
        `pb_caption_kit`,
        (large === true ? '_lg' : ''),
        (dark === true ? '_dark' : ''),
        className
      ])}
    >
      {text || children}
    </Tag>
  )
}

export default Caption
