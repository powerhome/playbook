/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { Avatar } from '../'
import { spacing } from '../utilities/spacing.js'

type MultipleUsersProps = {
  className?: String,
  id?: String,
  maxDisplayedUsers?: Number,
  reverse?: Boolean,
  users: Array<Object>,
}

const MultipleUsers = (props: MultipleUsersProps) => {
  const { className, id, maxDisplayedUsers = 4, reverse = false, users } = props
  const displayCount =
    users.length > maxDisplayedUsers ? maxDisplayedUsers - 1 : users.length
  const usersToDisplay = users.slice(0, displayCount)

  return (
    <div
        className={classnames(
        className,
        buildCss('pb_multiple_users_kit', reverse && 'reverse'),
        spacing(props)
      )}
        id={id}
    >
      {usersToDisplay.map((avatarData, index) => (
        <Avatar
            {...avatarData}
            className="pb_multiple_users_item"
            key={index}
            size="xs"
        />
      ))}

      <If condition={users.length > maxDisplayedUsers}>
        <div className="pb_multiple_users_item multiple_users_badge">
          {`+${users.length - 3}`}
        </div>
      </If>
    </div>
  )
}

export default MultipleUsers
