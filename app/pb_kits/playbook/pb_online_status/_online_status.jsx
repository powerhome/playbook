/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildDataProps,
} from '../utilities/props'

type OnlineStatusProps = {
  id?: String,
  data?: object,
  className?: String,
  status: "online" | "offline" | "away",
}

const OnlineStatus = ({
  id,
  data = {},
  className,
  status = 'offline',
}: OnlineStatusProps) => {
  const dataProps = buildDataProps(data)
  const css = classnames([
    `pb_online_status_kit_${status}`,
    className,
  ])

  return (
    <div
        {...dataProps}
        className={css}
        id={id}
    />
  )
}

export default OnlineStatus
