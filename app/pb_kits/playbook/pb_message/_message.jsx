/* @flow */

import React from 'react'
import { Avatar, Body, Caption } from '../'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

type MessageProps = {
  avatarName?: String,
  avatarStatus?: String,
  avatarUrl?: String,
  label?: String,
  message: String,
  timestamp?: String,
}

const Message = (props: MessageProps) => {
  const {
    avatarName = '',
    avatarUrl = '',
    label = '',
    message = '',
    timestamp = '',
    avatarStatus = null,
  } = props
  const shouldDisplayAvatar = avatarUrl || avatarName
  const classes = shouldDisplayAvatar
    ? 'pb_message_kit_avatar'
    : 'pb_message_kit'

  return (
    <div className={classnames(classes, spacing(props))}>
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
