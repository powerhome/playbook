/* @flow */

import React from 'react'
import { Avatar, Body, Caption } from '../'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { systemProps } from '../utilities/systemProps.js'

type MessageProps = {
  aria: object,
  avatarName?: String,
  avatarStatus?: String,
  avatarUrl?: String,
  className?: String,
  data?: object,
  id?: String,
  label?: String,
  message: String,
  timestamp?: String,
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
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const shouldDisplayAvatar = avatarUrl || avatarName
  const baseClassName = shouldDisplayAvatar
    ? 'pb_message_kit_avatar'
    : 'pb_message_kit'

  const classes = classnames(buildCss(baseClassName), className, systemProps(props))

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
            size="sm"
            status={avatarStatus}
        />
      </If>
      <div className="content_wrapper">
        <If condition={label}>
          <Caption>{label}</Caption>
        </If>
        <Body>{message}</Body>
        <If condition={timestamp}>
          <Caption size="xs">{timestamp}</Caption>
        </If>
      </div>
    </div>
  )
}

export default Message
