/* @flow */

import React from 'react'

type ProgressStepperProps = {
  className?: String,
  data?: String,
  id?: String,
}

const ProgressStepper = ({
  className,
  data,
  id,
}: ProgressStepperProps) => (
  <ul>
    <li>
      <p>
       {'left side'}
      </p>
      <p>
        {'right side'}
      </p>
    </li>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </ul>
)

export default ProgressStepper
