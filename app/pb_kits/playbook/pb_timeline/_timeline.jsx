/* @flow */

import React from 'react'

type TimelineProps = {
  className?: String,
  data?: String,
  id?: String,
}

const Timeline = ({
  className,
  data,
  id,
}: TimelineProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default Timeline
