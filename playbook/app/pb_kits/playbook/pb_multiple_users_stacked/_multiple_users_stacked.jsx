/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'
import { Avatar, Badge } from '../'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

type MultipleUsersStackedProps = {
  aria?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  id?: string,
  users: array<object>,
}

const MultipleUsersStacked = (props: MultipleUsersStackedProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    id,
    users,
  } = props

  const moreThanTwo = users.length > 2
  const onlyOne = users.length == 1
  const displayCount = () => {
    return moreThanTwo ? 1 : users.length
  }
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss(
    'pb_multiple_users_stacked_kit',
    { single: onlyOne }), globalProps(props), className)

  const firstUser = () => {
    return users.slice(0, 1).map((userObject, index) => {
      return (
        <Avatar
            {...userObject}
            className="pb_multiple_users_stacked_item"
            dark={dark}
            key={index}
            size="xs"
        />
      )
    })
  }

  const secondUser = () => {
    if (moreThanTwo === false) {
      return users.slice(1, 2).map((userObject, index) => {
        return (
          <Avatar
              {...userObject}
              className="pb_multiple_users_stacked_item second_item"
              dark={dark}
              key={index}
              size="xs"
          />
        )
      })
    }
  }

  const plusUsers = () => {
    if (moreThanTwo === true) {
      return (
        <Badge
            className="pb_multiple_users_stacked_item second_item"
            dark={dark}
            rounded
            text={`+${users.length - displayCount()}`}
            variant="primary"
        />
      )
    }
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {firstUser()}
      {secondUser()}
      {plusUsers()}
    </div>
  )
}

export default MultipleUsersStacked
