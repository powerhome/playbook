/* @flow */

import React from 'react'

type TestKitProps = {
  className?: String,
  data?: String,
  id?: String,
}

const TestKit = ({
  className,
  data,
  id,
}: TestKitProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default TestKit
