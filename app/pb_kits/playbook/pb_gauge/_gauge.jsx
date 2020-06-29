/* @flow */

import React from 'react'

type GaugeProps = {
  className?: String,
  data?: String,
  id?: String,
}

const Gauge = ({
  className,
  data,
  id,
}: GaugeProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default Gauge
