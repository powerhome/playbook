/* @flow */

import React from 'react'

import {
  Avatar,
  Body,
  Title,
} from '../'

type UserProps = {
  className?: String,
  id?: String,
  name: String,
  territory?: String,
  title?: String,
  size?: 'sm' | 'md' | 'lg',
  align?: 'left' | 'center' | 'right',
  orientation?: 'horiztonal' | 'vertical',
  avatar?: Boolean,
  avatarUrl?: String,
}

const User = ({
  name = '',
  territory = '',
  title = '',
  align = 'left',
  orientation = 'horizontal',
  size = 'sm',
  avatar = false,
  avatarUrl,
}: UserProps) => (
  <div className={`pb_user_kit_${align}_${orientation}_${size}`}>
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

export default User
