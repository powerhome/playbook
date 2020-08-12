/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Avatar, Body, Title } from '../'
import { globalProps } from '../utilities/globalProps.js'

type UserProps = {
  className?: string,
  id?: string,
  name: string,
  territory?: string,
  title?: string,
  size?: "sm" | "md" | "lg",
  align?: "left" | "center" | "right",
  orientation?: "horiztonal" | "vertical",
  avatar?: boolean,
  avatarUrl?: string,
}

const User = (props: UserProps) => {
  const {
    name = '',
    territory = '',
    title = '',
    align = 'left',
    orientation = 'horizontal',
    size = 'sm',
    avatar = false,
    avatarUrl,
  } = props
  return (
    <div className={classnames(`pb_user_kit_${align}_${orientation}_${size}`, globalProps(props))}>
      <If condition={avatar || avatarUrl}>
        <Avatar
            imageUrl={avatarUrl}
            name={name}
            size={size}
        />
      </If>

      <div className="content_wrapper">
        <Title
            size={size == 'lg' ? 3 : 4}
            text={name}
        />
        <Body color="light">
          {territory == '' ? title : `${territory} • ${title}`}
        </Body>
      </div>
    </div>
  )
}

export default User
