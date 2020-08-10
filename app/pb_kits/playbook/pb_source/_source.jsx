/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildDataProps,
} from '../utilities/props'
import {
  titleize,
} from '../utilities/text'
import {
  Avatar,
  Body,
  Caption,
  IconCircle,
  Title,
} from '../'

type SourceProps = {
  className?: string,
  data?: object,
  hideIcon: boolean,
  id?: string,
  source?: string,
  type: "events" | "inbound" | "outbound" | "prospecting" | "referral" | "retail" | "user",
  user: object,
}

const Source = ({
  className,
  data = {},
  hideIcon = false,
  id,
  source,
  type = 'inbound',
  user = {},
}: SourceProps) => {
  const dataProps = buildDataProps(data)

  const css = classnames([
    'pb_source_kit',
    className,
  ])

  const avatar = () => {
    if ((type === 'user' || type === 'referral') && user.name !== undefined) {
      const avatarProps = { ...user }
      avatarProps.size = 'sm'
      delete avatarProps.userId
      return avatarProps
    }
  }

  const typeText = () => {
    if (type === 'user' || (type === 'referral' && user.name !== undefined)) {
      return user.name
    } else {
      return titleize(type)
    }
  }

  const typeIconNames = {
    events: 'calendar-alt',
    outbound: 'sign-out',
    prospecting: 'binoculars',
    referral: 'handshake',
    retail: 'shopping-bag',
    inbound: 'sign-in',
  }

  const showIcon = () => type !== 'user' && (avatar() === undefined)

  return (
    <div
        {...dataProps}
        className={css}
        id={id}
    >

      <div className="pb__source_layout">
        <If condition={hideIcon === false}>
          <If condition={showIcon()}>
            <IconCircle
                icon={typeIconNames[type]}
                size="sm"
            />
            <Else />
            <Avatar
                {...avatar()}
            />
          </If>
        </If>

        <div className="pb__source_content">
          <Title
              size={4}
              tag="h4"
              text={source}
          />

          <div className="pb__source_value">
            <Body
                color="light"
                text={typeText()}
            />

            <If condition={user.userId}>
              <Caption
                  text={user.userId}
              />
            </If>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Source
