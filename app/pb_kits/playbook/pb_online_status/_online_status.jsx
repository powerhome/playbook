/* @flow */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

import { buildDataProps } from '../utilities/props'

type OnlineStatusProps = {
  className?: String,
  data?: object,
  id?: String,
  status?: "online" | "offline" | "away",
}

const OnlineStatus = (props: OnlineStatusProps) => {
  const { id, data = {}, className, status = 'offline' } = props
  const dataProps = buildDataProps(data)
  const css = classnames([`pb_online_status_kit_${status}`, className], spacing(props))

  return (
    <div
        {...dataProps}
        className={css}
        id={id}
    />
  )
}

export default OnlineStatus
