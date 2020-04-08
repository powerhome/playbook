/* @flow */

import React from 'react'

type DateTimeStackedProps = {
  className?: String,
  data?: String,
  id?: String,
}

const DateTimeStacked = ({
  className,
  data,
  id,
}: DateTimeStackedProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default DateTimeStacked
