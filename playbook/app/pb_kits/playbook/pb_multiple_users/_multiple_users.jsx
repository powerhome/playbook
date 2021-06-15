/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { Avatar } from '../'
import { globalProps } from '../utilities/globalProps.js'

type MultipleUsersProps = {
  aria?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  id?: string,
  maxDisplayedUsers?: number,
  reverse?: boolean,
  size?: string,
  users: array<object>,
}

const MultipleUsers = (props: MultipleUsersProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    id,
    maxDisplayedUsers = 4,
    reverse = false,
    size = 'xs',
    users,
  } = props

  const displayCount =
    users.length > maxDisplayedUsers ? maxDisplayedUsers - 1 : users.length
  const usersToDisplay = users.slice(0, displayCount)
  const reverseClass = reverse === true ? 'reverse' : ''

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_multiple_users_kit', reverseClass),
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
      {usersToDisplay.map((avatarData, index) => (
        <Avatar
            {...avatarData}
            className="pb_multiple_users_item"
            dark={dark}
            key={index}
            size={size}
        />
      ))}

      <If condition={users.length > maxDisplayedUsers}>
        <div className={`pb_multiple_users_item multiple_users_badge${size == 'xxs' ? '_xxs' : ''}`}>
          {`+${users.length - 3}`}
        </div>
      </If>
    </div>
  )
}

export default MultipleUsers
