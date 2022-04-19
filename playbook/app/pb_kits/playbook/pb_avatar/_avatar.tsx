import React, { useState } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Image from '../pb_image/_image'
import OnlineStatus from '../pb_online_status/_online_status'

type AvatarProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: {[key: string]: string},
  dark?: boolean,
  id?: string,
  imageAlt?: string,
  imageUrl: string,
  name: string,
  size?: "md" | "lg" | "sm" | "xl" | "xs" | "xxs",
  status: "away" | "offline" | "online",
}

const firstTwoInitials = (name: string) =>
  name.split(/\s/).map((name) => name[0])
    .join('')
    .substring(0, 2)

const Avatar = (props: AvatarProps) => {
  const {
    aria = {},
    className,
    data = {},
    name = null,
    id = '',
    imageAlt = '',
    imageUrl,
    size = 'md',
    status = null,
    dark = false,
  } = props
  const dataProps: {[key: string]: any} = buildDataProps(data)
  const ariaProps: {[key: string]: any} = buildAriaProps(aria)
  const classes = classnames(
    buildCss('pb_avatar_kit', `size_${size}`),
    globalProps(props),
    className
  )

  const initials = name && firstTwoInitials(name)
  dataProps['data-initials'] = initials

  const [error, setError] = useState(false)
  const handleError = () => setError(true)

  const canShowImage = imageUrl && !error

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
        { canShowImage && (
          <Image
              alt={imageAlt}
              onError={handleError}
              url={imageUrl}
          />
        )}
      </div>
      {status && (
        <OnlineStatus
            className={`size_${size}`}
            dark={dark}
            status={status}
        />
      )}
    </div>
  )
}

export default Avatar
