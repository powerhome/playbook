/* @flow */

import React from 'react'

type TimeRangeInlineProps = {
  className?: String,
  alignment?: String,
  dark?: Boolean,
  data?: String,
  icon?: Boolean,
  id?: String,
  timezone?: Boolean,
}

const TimeRangeInline = ({
  className,
  alignment,
  dark,
  data,
  icon,
  id,
  timezone,
}: TimeRangeInlineProps) => (
  <div>
    <p>{`alignment: ${alignment}`}</p>
    <p>{`className: ${className}`}</p>
    <p>{`dark: ${dark}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`icon: ${icon}`}</p>
    <p>{`id: ${id}`}</p>
    <p>{`timezone: ${timezone}`}</p>
  </div>
)

export default TimeRangeInline
