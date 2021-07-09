/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Avatar from '../pb_avatar/_avatar'
import Body from '../pb_body/_body'
import Flex from '../pb_flex/_flex'
import Timestamp from '../pb_timestamp/_timestamp'
import Title from '../pb_title/_title'

type MessageProps = {
  aria: object,
  avatarName?: string,
  avatarStatus?: string,
  avatarUrl?: string,
  children?: array<React.ReactNode> | React.ReactNode,
  className?: string,
  data?: object,
  id?: string,
  label?: string,
  message: string,
  timestamp?: string,
  timestampObject?: string,
  alignTimestamp?: string,
}

const Message = (props: MessageProps) => {
  const {
    aria = {},
    avatarName,
    avatarStatus = null,
    avatarUrl,
    children,
    className,
    data = {},
    id,
    label,
    message,
    timestamp,
    timestampObject,
    alignTimestamp = 'right',
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
        <Flex
            justify={alignTimestamp === 'left' ? 'none' : 'between'}
            orientation="row"
        >
          <If condition={label}>
            <Title
                className="message_title"
                size={4}
                text={label}
            />
          </If>
          <Timestamp
              className={`pull-${alignTimestamp} ${timestampObject ? 'message_humanized_time' : null}`}
              text={timestamp}
          />
          <If condition={timestampObject}>
            <Timestamp
                className={`pull-${alignTimestamp} message_timestamp`}
                timestamp={timestampObject}
            />
          </If>
        </Flex>
        <If condition={message}>
          <Body
              className="pb_message_body"
              text={message}
          />
        </If>
        <If condition={children}>
          { children }
        </If>
      </div>
    </div>
  )
}

export default Message
