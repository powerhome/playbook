/* @flow */

import React from 'react'

type PopoverProps = {
  className?: String,
  data?: String,
  id?: String,
}

const Popover = ({
  className,
  data,
  id,
}: PopoverProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default Popover
