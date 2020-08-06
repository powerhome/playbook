/* @flow */

import React from 'react'
import classnames from 'classnames'
import { map } from 'lodash'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

import { Image } from '../'

type AvatarProps = {
  aria?: object,
  className?: String,
  data?: object,
  id?: String,
  imageUrl: String,
  name: String,
  size?: "md" | "lg" | "sm" | "xl" | "xs",
  status: "away" | "offline" | "online",
}

const firstTwoInitials = (name) =>
  map(name.split(/\s/), (name) => name[0])
    .join('')
    .substring(0, 2)

const Avatar = (props: AvatarProps) => {
  const { aria = {}, className, data = {}, name = null, id = id, imageUrl, size = 'md', status = null } = props
  const dataProps = buildDataProps(data)
  const ariaProps = buildAriaProps(aria)
  const classes = classnames(buildCss('pb_avatar_kit', size), className, globalProps(props))

  const initials = name && firstTwoInitials(name)
  dataProps['data-initials'] = initials

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
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
