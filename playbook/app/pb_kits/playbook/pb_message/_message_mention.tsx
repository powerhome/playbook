import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type MessageMentionProps = {
  aria: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  data?: object,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  variant: 'user' | 'self',
}

const MessageMention = (props: MessageMentionProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    id,
    variant = 'user',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_message_mention', variant),
    globalProps(props),
    className
  )

  return (
    <div
      {...ariaProps}
      {...dataProps}
      {...htmlProps}
      className={classes}
      id={id}
    >
      {children}
    </div>
  )
}

export default MessageMention
