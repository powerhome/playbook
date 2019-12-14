/* @flow */

import React from 'react'

import { Avatar, Body, Caption } from '../'

type MessageProps = {
  avatarName?: String,
  avatarStatus?: String,
  avatarUrl?: String,
  label?: String,
  message: String,
  timestamp?: String,
}

const Message = ({
  avatarName = '',
  avatarUrl = '',
  label = '',
  message = '',
  timestamp = '',
  avatarStatus = null,
}: MessageProps) => {
  const shouldDisplayAvatar = avatarUrl || avatarName
  const classes = shouldDisplayAvatar ? 'pb_message_kit_avatar' : 'pb_message_kit'

  return (
    <div className={classes}>
      <If condition={shouldDisplayAvatar}>
        <Avatar
            imageUrl={avatarUrl}
            name={avatarName}
            size='sm'
            status={avatarStatus}
        />
      </If>
      <div className="content_wrapper">
        <If condition={label}>
          <Caption>{label}</Caption>
        </If>
        <Body>{message}</Body>
        <If condition={timestamp}>
          <Caption size='xs'>{timestamp}</Caption>
        </If>
      </div>
    </div>
  )
}

export default Message
