/* @flow */

import React from 'react'
import { Avatar, Body, Caption, Timestamp, Title } from '../'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type MessageProps = {
  aria: object,
  avatarName?: string,
  avatarStatus?: string,
  avatarUrl?: string,
  className?: string,
  data?: object,
  id?: string,
  label?: string,
  message: string,
  timestamp?: string,
  timestampObject?: string,
}

const Message = (props: MessageProps) => {
  const {
    aria = {},
    avatarName,
    avatarStatus = null,
    avatarUrl,
    className,
    data = {},
    id,
    label,
    message,
    timestamp,
    timestampObject,
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const shouldDisplayAvatar = avatarUrl || avatarName
  const baseClassName = shouldDisplayAvatar
    ? 'pb_message_kit_avatar'
    : 'pb_message_kit'

  const classes = classnames(
    buildCss(baseClassName),
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
      <If condition={shouldDisplayAvatar}>
        <Avatar
            imageUrl={avatarUrl}
            name={avatarName}
            size="xs"
            status={avatarStatus}
        />
      </If>
      <div className="content_wrapper">
        <Timestamp text={timestamp} className={`pull-right ${timestampObject ? 'message_humanized_time' : null}`} />
        <If condition={timestampObject}>
          <Timestamp timestamp={timestampObject} className={"pull-right message_timestamp"} />
        </If>

        <If condition={label}>
          <Title className="message_title" text={label} size={4} />
        </If>
        <Body className={"pb_message_body"} text={message} />
      </div>
    </div>
  )
}

export default Message
