/* @flow */

import React from 'react'

type DateTimeProps = {
  className?: String,
  data?: String,
  id?: String,
}

const DateTime = ({
  className,
  data,
  id,
}: DateTimeProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default DateTime
