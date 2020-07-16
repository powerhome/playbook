/* @flow */

import React from 'react'

type TestKit2Props = {
  aria?: Object,
  className?: String,
  data?: Object,
  id?: String,
}

const TestKit2 = ({
  aria,
  className,
  data,
  id,
}: TestKit2Props) => (
  <div>
    <p>{`aria: ${aria}`}</p>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default TestKit2
