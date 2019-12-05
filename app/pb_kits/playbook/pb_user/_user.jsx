/* @flow */

import React from 'react'

import {
  Title,
  Body,
  Avatar,
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

const userSizes = {
  sm: 4,
  md: 4,
  lg: 3,
}

const avatarSizes = {
  sm: 'sm',
  md: 'md',
  lg: 'xl',
}

const User = (props: UserProps) => {
  const {
    name='Anna Black',
    territory='',
    title='',
    align='left',
    orientation='horizontal',
    size='sm',
    avatar=false,
    avatarUrl,
  } = props

  const printAvatar = (avatar, avatarUrl) => {
    if (avatar == true | avatarUrl != null) {
      return (
        <Avatar
            image_url={avatarUrl}
            name={name}
            size={avatarSizes[size]}
        />
      )
    }
  }

  const printDetails = (territory='') => {
    if (territory !== '') {
      return (
        <Body color='light'>{`${territory} • ${title}`}</Body>
      )
    } else {
      return (
        <Body color='light'>{`${title}`}</Body>
      )
    }
  }

  return (
    <div className={`pb_user_kit_${align}_${orientation}_${size}`}>
      {printAvatar(avatar, avatarUrl)}
      <div className="content_wrapper">
        <Title
            size={userSizes[size]}
            text={`${name}`}
        />
        {printDetails(territory)}
      </div>
    </div>
  )
}

export default User
