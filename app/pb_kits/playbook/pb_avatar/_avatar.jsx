/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

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

const initials = function(name) {
  if (name) {
    return map(name.split(/\s/), (name) => name[0]).join('').substring(0, 2)
  }
}

const image = function(imageUrl, name) {
  if (imageUrl) {
    return (
      <Image
          alt={name}
          url={imageUrl}
      />
    )
  }
}

const PbStatus = ({ size, status } : { size: String, status: String }) => (
  <div className={`pb_online_status_kit_${status} size_${size}`} />
)

const Avatar = ({
  className,
  name=null,
  imageUrl,
  size='md',
  status=null,
}: AvatarProps) => {
  const statusDisplay = () => {
    if (status !== null){
      return (
        <PbStatus
            size={size}
            status={status}
        />
      )
    }
  }

  const css = classnames([
    'pb_avatar_kit',
    `avatar_${size}`,
    className,
  ])

  return (
    <div
        className={css}
        data-initials={initials(name)}
    >
      <div
          className="avatar_wrapper"
          data-initials={initials(name)}
      >
        {image(imageUrl, name)}
      </div>
      {statusDisplay()}
    </div>
  )
}

export default Avatar
