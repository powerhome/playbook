import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type MessageMentionProps = {
  aria: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  data?: object,
  id?: string,
  variant: 'user' | 'self',
}

const MessageMention = (props: MessageMentionProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    id,
    variant = 'user',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_message_mention', variant),
    globalProps(props),
    className
  )

  return (
    <div
      {...ariaProps}
      {...dataProps}
      className={classes}
      id={id}
    >
      {children}
    </div>
  )
}

export default MessageMention
