/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import { buildCss } from '../utilities/props'
import { Avatar } from '../'

type MultipleUsersProps = {
  className?: String,
  id?: String,
  maxDisplayedUsers?: Number,
  reverse?: Boolean,
  users: Array<Object>,
}

const MultipleUsers = ({
  className,
  id,
  maxDisplayedUsers = 4,
  reverse = false,
  users,
}: MultipleUsersProps) => {
  const displayCount = users.length > maxDisplayedUsers ? maxDisplayedUsers - 1 : users.length
  const usersToDisplay = users.slice(0, displayCount)

  return (
    <div
        className={classnames(className, buildCss('pb_multiple_users_kit', reverse && 'reverse'))}
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
