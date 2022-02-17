import React from 'react'
import classnames from 'classnames'
import { GlobalProps, globalProps } from '../utilities/globalProps'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

type OnlineStatusProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: {[key: string]: string | number},
  id?: string,
  status?: "online" | "offline" | "away",
} & GlobalProps

const OnlineStatus = (props: OnlineStatusProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    status = 'offline',
  } = props

  aria.label = status

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_online_status_kit', status), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    />
  )
}

export default OnlineStatus
