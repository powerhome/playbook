/* @flow */

import React from 'react'

type FilterProps = {
  className?: String,
  data?: String,
  id?: String,
}

const Filter = ({
  className,
  data,
  id,
}: FilterProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default Filter
