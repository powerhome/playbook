/* @flow */

import React from 'react'

type ProjectProps = {
  className?: String,
  data?: String,
  id?: String,
}

const Project = ({
  className,
  data,
  id,
}: ProjectProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default Project
