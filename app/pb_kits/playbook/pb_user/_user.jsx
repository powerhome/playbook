/* @flow */

import React from 'react';

import {
  Title,
  Body,
  Avatar
} from '../'

type UserProps = {
  className?: String,
  id?: String,
  name: String,
  title?: String,
  size?: 'sm' | 'md' | 'lg',
  align?: 'left' | 'center' | 'right',
  orientation?: 'horiztonal' | 'vertical',
  avatar?: Boolean,
  avatar_url?: String,
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
    title='',
    align='left',
    orientation='horizontal',
    size='sm',
    avatar=false,
    avatar_url,
  } = props 

  const print_avatar = (avatar, avatar_url) => {
    if (avatar == true | avatar_url != null ) {
      return (
        <Avatar name={name} size={avatarSizes[size]} url={avatar_url}/>
      )
    }
  }

  return (
    <div className={`pb_user_kit_${align}_${orientation}_${size}`}>
      {print_avatar(avatar, avatar_url)}
      <div className="content_wrapper">
        <Title size={userSizes[size]} text={`${name}`}/>
        <Body color='light'>{`${title}`}</Body>
      </div>
    </div> 
  )
}

export default User;
