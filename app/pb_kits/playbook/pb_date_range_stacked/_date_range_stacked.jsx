/* @flow */

import React from 'react'

type DateRangeStackedProps = {
  className?: String,
  data?: String,
  id?: String,
}

const DateRangeStacked = ({
  className,
  data,
  id,
}: DateRangeStackedProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default DateRangeStacked
