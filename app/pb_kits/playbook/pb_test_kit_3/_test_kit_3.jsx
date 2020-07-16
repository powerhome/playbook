/* @flow */

import React from 'react'

type TestKit3Props = {
  aria?: Object,
  className?: String,
  data?: Object,
  id?: String,
}

const TestKit3 = ({
  aria,
  className,
  data,
  id,
}: TestKit3Props) => (
  <div>
    <p>{`aria: ${aria}`}</p>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default TestKit3
