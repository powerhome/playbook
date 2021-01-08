import React from 'react'
import { IconCircle } from '../../'

const IconCircleColor = (props) => {
  return (
    <div>
      <IconCircle
          icon="rocket"
          size="sm"
          variant="royal"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="sm"
          variant="blue"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="sm"
          variant="purple"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="sm"
          variant="teal"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="sm"
          variant="red"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="sm"
          variant="yellow"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="sm"
          variant="green"
          {...props}
      />
    </div>
  )
}

export default IconCircleColor
