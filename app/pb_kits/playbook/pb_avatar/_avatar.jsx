/* @flow */

import React from 'react'
import classnames from 'classnames'
import { map } from 'lodash'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

import { Image, OnlineStatus } from '../'

type AvatarProps = {
  aria?: object,
  className?: string,
  data?: object,
  dark?: boolean,
  id?: string,
  imageUrl: string,
  name: string,
  size?: "md" | "lg" | "sm" | "xl" | "xs",
  status: "away" | "offline" | "online",
}

const firstTwoInitials = (name) =>
  map(name.split(/\s/), (name) => name[0])
    .join('')
    .substring(0, 2)

const Avatar = (props: AvatarProps) => {
  const { aria = {}, className, data = {}, name = null, id = id, imageUrl, size = 'md', status = null, dark = false } = props
  const dataProps = buildDataProps(data)
  const ariaProps = buildAriaProps(aria)
  const classes = classnames(
    buildCss('pb_avatar_kit', size),
    globalProps(props),
    className
  )

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
        <OnlineStatus
            className={`size_${size}`}
            dark={dark}
            status={status}
        />
      </If>
    </div>
  )
}

export default Avatar
