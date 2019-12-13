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
  reverse?: Boolean,
  users: Array<Object>,
}

const MultipleUsersStacked = ({
    className,
    id,
    reverse=false,
    users
  }: MultipleUsersStackedProps) => {

  const multipleUsersStackedCss = () => {
    let css = 'pb_multiple_users_stacked_kit'
    css += reverse === true ? '_reverse' : ''
    return css
  }

  const moreThanFour = () => {
    return users.length > 4
  }

  const displayCount = () => {
    return moreThanFour() ? 3 : users.length
  }

  const multipleUsersStacked = () => {
    return users.slice(0, displayCount()).map((userObject, index) => {
      return (
        <Avatar
          {...userObject}
          key={index}
          size="xs"
          className="pb_multiple_users_stacked_item" />
      )
    })
  }

  const plusUsers = () => {
    if( moreThanFour() === true ) {
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
      {plusUsers()}
    </div>
  )
}

export default MultipleUsersStacked
