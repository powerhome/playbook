import React from 'react'
import classnames from 'classnames'
import { GlobalProps, globalProps } from '../utilities/globalProps'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

type OnlineStatusProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: {[key: string]: string | number},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  status?: "away" | "error" | "info" | "neutral" | "offline" |"online" | "primary"| "success" | "warning",
  size?: "sm" | "md" | "lg",
  noBorder?: boolean,
} & GlobalProps

const OnlineStatus = (props: OnlineStatusProps) => {
  const {
    aria = {},
    className,
    data = {},
    htmlOptions = {},
    id,
    status = 'offline',
    size = 'sm',
    noBorder = false,
  } = props

  aria.label = status

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const getBorder = noBorder ? 'no_border' : ''
  const classes = classnames(buildCss('pb_online_status_kit', getBorder ), `${size && "pb_online_status_size_" + size}`,  `pb_online_status_${status && status}`,globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    />
  )
}

export default OnlineStatus
