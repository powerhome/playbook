/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type HighlightProps = {
  className?: String,
  data?: String,
  id?: String,
}

const Highlight = ({
  className,
  data,
  id,
}: HighlightProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default Highlight
