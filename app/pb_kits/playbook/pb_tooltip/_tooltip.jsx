/* @flow */

import React from 'react'

type TooltipProps = {
  className?: String,
  data?: String,
  id?: String,
}

const Tooltip = ({
  className,
  data,
  id,
}: TooltipProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default Tooltip
