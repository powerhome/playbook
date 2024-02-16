import React, { useState } from "react"
import classnames from "classnames"

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../utilities/props"
import { globalProps, GlobalProps } from "../utilities/globalProps"

import Image from "../pb_image/_image"
import OnlineStatus from "../pb_online_status/_online_status"

export type AvatarProps = {
  aria?: { [key: string]: string }
  children?: React.ReactNode
  className?: string
  data?: { [key: string]: string }
  dark?: boolean
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) }
  id?: string
  imageAlt?: string
  imageUrl?: string
  name?: string
  size?: "md" | "lg" | "sm" | "xl" | "xs" | "xxs"
  status?: "away" | "offline" | "online"
} & GlobalProps

const firstTwoInitials = (name: string) =>
  name
    .split(/\s/)
    .map((name) => name[0])
    .join("")
    .substring(0, 2)

const Avatar = (props: AvatarProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    name = undefined,
    id = "",
    imageAlt = "",
    imageUrl,
    size = "md",
    status = null,
    dark = false,
  } = props
  const dataProps: { [key: string]: string } = buildDataProps(data)
  const ariaProps: { [key: string]: string } = buildAriaProps(aria)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss("pb_avatar_kit", `size_${size}`),
    globalProps(props),
    className
  )

  const initials = name && firstTwoInitials(name)
  dataProps["data-initials"] = initials as string

  const [error, setError] = useState(false)
  const handleError = () => setError(true)

  const canShowImage = imageUrl && !error

  return (
    <div
      {...ariaProps}
      {...dataProps}
      {...htmlProps}
      className={classes}
      id={id}
    >
      <div className='avatar_wrapper' data-initials={initials}>
        {canShowImage && (
          <Image
            alt={imageAlt ? imageAlt : name}
            onError={handleError}
            url={imageUrl}
          />
        )}
      </div>
      {children}
      {status && (
        <OnlineStatus className={`size_${size}`} dark={dark} status={status} />
      )}
    </div>
  )
}

export default Avatar
