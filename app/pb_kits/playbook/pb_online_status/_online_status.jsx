/* @flow */

import React from 'react'
import classnames from 'classnames'
import { systemProps } from '../utilities/systemProps.js'

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
  const css = classnames([`pb_online_status_kit_${status}`, className], systemProps(props))

  return (
    <div
        {...dataProps}
        className={css}
        id={id}
    />
  )
}

export default OnlineStatus
