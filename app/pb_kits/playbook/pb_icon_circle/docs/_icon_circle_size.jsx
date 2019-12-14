import React from 'react'
import classnames from 'classnames'
import { IconCircle } from '../..'

function IconCircleSize() {
  return (
    <div>
      <IconCircle
          icon="rocket"
          size="sm"
      />
      <br />
      <IconCircle
          icon="rocket"
          size="md"
      />
      <br />
      <IconCircle
          icon="rocket"
          size="lg"
      />
      <br />
      <IconCircle
          icon="rocket"
          size="xl"
      />
    </div>
  )
}

export default IconCircleSize
