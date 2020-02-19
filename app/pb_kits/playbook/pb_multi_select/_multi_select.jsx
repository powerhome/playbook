/* @flow */

import React from 'react'

type MultiSelectProps = {
  className?: String,
  data?: String,
  id?: String,
}

const MultiSelect = ({
  className,
  data,
  id,
}: MultiSelectProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default MultiSelect
