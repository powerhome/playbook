/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildDataProps,
} from '../utilities/props'
import {
  titleize
} from '../utilities/text'
import {
  Avatar,
  Body,
  Caption,
  IconCircle,
  Title,
} from '../'

type SourceProps = {
  className?: String,
  data?: object,
  hideIcon: Boolean,
  id?: String,
  source?: String,
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
      const avatarProps = Object.assign({}, user)
      avatarProps['size'] = 'sm'
      delete avatarProps.user_id
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

  const typeIconName = () => {
    const option = type
    switch (option) {
    case 'events':
      return 'calendar-alt'
      break
    case 'outbound':
      return 'sign-out'
      break
    case 'prospecting':
      return 'binoculars'
      break
    case 'referral':
      return 'handshake'
      break
    case 'retail':
      return 'shopping-bag'
      break
    default:
      return 'sign-in'
    }
  }

  const showIcon = () => {
    (typeIconName !== undefined && avatar === undefined) ? true : false
  }

  return (
    <div
        {...dataProps}
        className={css}
        id={id}
    >

      <div className="pb__source_layout">

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
