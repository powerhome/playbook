import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Avatar from '../pb_avatar/_avatar'
import Body from '../pb_body/_body'
import Flex from '../pb_flex/_flex'
import Timestamp from '../pb_timestamp/_timestamp'
import Title from '../pb_title/_title'
import MessageMention from './_message_mention'

type MessageProps = {
  aria: { [key: string]: string },
  avatarName?: string,
  avatarStatus?: "away" | "offline" | "online",
  avatarUrl?: string,
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  data?: Record<string, unknown>,
  grayscale?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  label?: string,
  message: string,
  timestamp?: string,
  timestampObject?: Date,
  timezone?: string,
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
    grayscale = false,
    htmlOptions = {},
    id,
    label,
    message,
    timestamp,
    timestampObject,
    timezone,
    alignTimestamp = 'right',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
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
        {...htmlProps}
        className={classes}
        id={id}
    >
      {shouldDisplayAvatar &&
        <Avatar
            grayscale={grayscale}
            imageUrl={avatarUrl}
            name={avatarName}
            size="xs"
            status={avatarStatus}
        />
      }
      <div className="content_wrapper">
        <Flex
            justify={alignTimestamp === 'left' ? 'none' : 'between'}
            orientation="row"
        >
          {label &&
            <Title
                className="message_title"
                size={4}
                text={label}
            />
          }
          <Timestamp
              className={`pull-${alignTimestamp} ${timestampObject ? 'message_humanized_time' : null}`}
              text={timestamp}
              timestamp={''}
              timezone={timezone}
          />
          {timestampObject &&
            <Timestamp
                className={`pull-${alignTimestamp} message_timestamp`}
                text={''}
                timestamp={timestampObject}
                timezone={timezone}
            />
          }
        </Flex>
        {message &&
          <Body
              className="pb_message_body"
              text={message}
          />
        }
        {children}
      </div>
    </div>
  )
}

Message.Mention = MessageMention
export default Message
