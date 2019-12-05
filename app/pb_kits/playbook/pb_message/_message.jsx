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

const print_label = (label) => {
  if (label != null) {
    return (
      <Caption>{`${label}`}</Caption>
    )
  }
}

const print_timestamp = (timestamp) => {
  if (timestamp != null) {
    return (
      <Caption size='xs'>{`${timestamp}`}</Caption>
    )
  }
}

const Message = (props: MessageProps) => {
  const {
    avatarName='',
    avatarUrl='',
    label='',
    message='',
    timestamp='',
    avatarStatus=null
  } = props

  const print_avatar = (avatarName, avatarUrl, avatarStatus) => {
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
      {print_avatar(avatarName, avatarUrl, avatarStatus)}
      <div className="content_wrapper">
        {print_label(label)}
        <Body>{message}</Body>
        {print_timestamp(timestamp)}
      </div>
    </div>
  )
}

export default Message
