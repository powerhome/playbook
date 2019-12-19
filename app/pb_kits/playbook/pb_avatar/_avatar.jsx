/* @flow */

import React from 'react'
import classnames from 'classnames'
import { map } from 'lodash'

import { Image } from '../'

type AvatarProps = {
  className?: String,
  name: String,
  imageUrl: String,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  status: 'online' | 'away',
}

const firstTwoInitials = (name) => (
  map(name.split(/\s/), (name) => name[0])
    .join('')
    .substring(0, 2)
)

const Avatar = ({
  className,
  name = null,
  imageUrl,
  size = 'md',
  status = null,
}: AvatarProps) => {
  const classes = classnames(['pb_avatar_kit', `avatar_${size}`, className])
  const initials = name && firstTwoInitials(name)

  return (
    <div className={classes}>
      <div
          className="avatar_wrapper"
          data-initials={initials}
      >
        <If condition={imageUrl}>
          <Image
              alt={name}
              url={imageUrl}
          />
        </If>
      </div>
      <If condition={status}>
        <div className={`pb_online_status_kit_${status} size_${size}`} />
      </If>
    </div>
  )
}

export default Avatar
