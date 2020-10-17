/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { Avatar, Body, Title } from '../'
import { globalProps } from '../utilities/globalProps.js'

type UserProps = {
  align?: "left" | "center" | "right",
  aria?: object,
  avatar?: Boolean,
  avatarUrl?: String,
  className?: String,
  dark?: boolean,
  data?: object,
  id?: String,
  name?: String,
  orientation?: "horiztonal" | "vertical",
  size?: "sm" | "md" | "lg",
  territory?: String,
  title?: String,
}

const User = (props: UserProps) => {
  const {
    align = 'left',
    aria = {},
    avatar = false,
    avatarUrl,
    className,
    dark = false,
    data = {},
    id,
    name,
    orientation = 'horizontal',
    size = 'sm',
    territory = '',
    title = '',
  } = props

  const avatarSizeMap = {
    lg: 'xl',
    md: 'md',
    sm: 'sm',
  }

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(
    buildCss('pb_user_kit', align, orientation, size),
    globalProps(props),
    className,
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <If condition={avatar || avatarUrl}>
        <Avatar
            imageUrl={avatarUrl}
            name={name}
            size={avatarSizeMap[size]}
        />
      </If>

      <div className="content_wrapper">
        <Title
            dark={dark}
            size={size == 'lg' ? 3 : 4}
            text={name}
        />
        <Body
            color="light"
            dark={dark}
        >
          {territory === '' ? title : `${territory} • ${title}`}
        </Body>
      </div>
    </div>
  )
}

export default User
