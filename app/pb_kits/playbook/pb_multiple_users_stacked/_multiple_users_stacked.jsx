/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import {
  Avatar
} from '../'

type MultipleUsersStackedProps = {
  className?: String,
  id?: String,
  users: Array<Object>,
}

const MultipleUsersStacked = ({
    className,
    id,
    users
  }: MultipleUsersStackedProps) => {

  const multipleUsersStackedCss = () => {
    let css = 'pb_multiple_users_stacked_kit'
    return css
  }

  const moreThanTwo = () => {
    return users.length > 2
  }

  const displayCount = () => {
    return moreThanTwo() ? 1 : users.length
  }

  const multipleUsersStacked = () => {
    return users.slice(0, 1).map((userObject, index) => {
      return (
        <Avatar
          {...userObject}
          key={index}
          size="xs"
          className="pb_multiple_users_stacked_item" />
      )
    })
  }

  const displaySecond = () => {
      if( moreThanTwo() === false ) {
    return users.slice(1, 2).map((userObject, index) => {
      return (
        <Avatar
          {...userObject}
          key={index}
          size="xs"
          className="second_displayed" />
      )
    })
  }
  }

  const plusUsers = () => {
    if( moreThanTwo() === true ) {
      return (
        <div className="pb_multiple_users_stacked_item multiple_users_stacked_badge">
          {`+${users.length - displayCount()}`}
        </div>
      )
    }
  }

  return (
    <div id={id} className={classnames(multipleUsersStackedCss(), className)}>
      {multipleUsersStacked()}
      {displaySecond()}
      {plusUsers()}
    </div>
  )
}

export default MultipleUsersStacked
