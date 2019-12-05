/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import {
  Avatar
} from '../'

type MultipleUsersProps = {
  className?: String,
  id?: String,
  reverse?: Boolean,
  users: Array<Object>,
}

const MultipleUsers = ({
    className,
    id,
    reverse=false,
    users
  }: MultipleUsersProps) => {

  const multipleUsersCss = () => {
    let css = 'pb_multiple_users_kit'
    css += reverse === true ? '_reverse' : ''
    return css
  }

  const moreThanFour = () => {
    return users.length > 4
  }

  const displayCount = () => {
    return moreThanFour() ? 3 : users.length
  }

  const multipleUsers = () => {
    return users.slice(0, displayCount()).map((userObject, index) => {
      return (
        <Avatar
            {...userObject}
            className="pb_multiple_users_item"
            key={index}
            size="xs"
        />
      )
    })
  }

  const plusUsers = () => {
    if( moreThanFour() === true ) {
      return (
        <div className="pb_multiple_users_item multiple_users_badge">
          {`+${users.length - displayCount()}`}
        </div>
      )
    }
  }

  return (
    <div
        className={classnames(multipleUsersCss(), className)}
        id={id}
    >
      {multipleUsers()}
      {plusUsers()}
    </div>
  )
}

export default MultipleUsers
