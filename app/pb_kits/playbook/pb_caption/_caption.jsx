/* @flow */

import React from 'react'

type CaptionProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  dark?: Boolean,
  large?: Boolean,
  tag: String,
  text: String,
}

const Caption = ({
  children,
  dark=false,
  large=false,
  tag='div',
  text,
}: CaptionProps) => {

  const Tag = `${tag}`

  return (
    <Tag
        className={
        `pb_caption_kit` +
        (large === true ? '_lg' : '') +
        (dark === true ? '_dark' : '')
      }
    >
      {text || children}
    </Tag>
  )
}

export default Caption
