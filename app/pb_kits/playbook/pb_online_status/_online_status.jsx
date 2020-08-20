/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

type OnlineStatusProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  status?: "online" | "offline" | "away",
}

const OnlineStatus = (props: OnlineStatusProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    status = 'offline',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_online_status_kit', status),globalProps(props), className)

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
