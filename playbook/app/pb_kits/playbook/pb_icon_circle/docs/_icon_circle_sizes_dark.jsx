import React from 'react'
import { IconCircle } from '../..'

const IconCircleSizesDark = (props) => {
  return (
    <div>
      <IconCircle
          dark
          icon="rocket"
          size="sm"
          {...props}
      />
      <br />
      <IconCircle
          dark
          icon="rocket"
          size="md"
          {...props}
      />
      <br />
      <IconCircle
          dark
          icon="rocket"
          size="lg"
          {...props}
      />
      <br />
      <IconCircle
          dark
          icon="rocket"
          size="xl"
          {...props}
      />
    </div>
  )
}

export default IconCircleSizesDark
