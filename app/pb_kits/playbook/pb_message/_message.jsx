/* @flow */

import React from 'react'

import {
  Body,
  Caption,
  Avatar,
} from '../'

type MessageProps = {
  avatarName?: String,
  avatarStatus?: String,
  avatarUrl?: String,
  label?: String,
  message: String,
  timestamp?: String,
}

const printLabel = (label) => {
  if (label != null) {
    return (
      <Caption>{`${label}`}</Caption>
    )
  }
}

const printTimestamp = (timestamp) => {
  if (timestamp != null) {
    return (
      <Caption size='xs'>{`${timestamp}`}</Caption>
    )
  }
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

  const printAvatar = (avatarName, avatarUrl, avatarStatus) => {
    if (avatarUrl !== '' && avatarName !== '') {
      return (
        <Avatar
            imageUrl={avatarUrl}
            name={avatarName}
            size='sm'
            status={avatarStatus}
        />
      )
    }
    if (avatarUrl === '' && avatarName !== '') {
      return (
        <Avatar
            name={avatarName}
            size='sm'
            status={avatarStatus}
        />
      )
    }
  }

  const messageCSS = (avatarUrl, avatarName) => {
    if (avatarUrl != '' || avatarName != '') {
      return 'pb_message_kit_avatar'
    } else {
      return 'pb_message_kit'
    }
  }

  return (
    <div className={messageCSS(avatarName, avatarUrl)}>
      {printAvatar(avatarName, avatarUrl, avatarStatus)}
      <div className="content_wrapper">
        {printLabel(label)}
        <Body>{message}</Body>
        {printTimestamp(timestamp)}
      </div>
    </div>
  )
}

export default Message
