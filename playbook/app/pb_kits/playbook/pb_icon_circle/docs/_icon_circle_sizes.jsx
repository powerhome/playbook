import React from 'react'
import IconCircle from '../../pb_icon_circle/_icon_circle'

const IconCircleSizes = (props) => {
  return (
    <div>
      <IconCircle
          icon="rocket"
          size="xxs"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="xs"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="sm"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="md"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="lg"
          {...props}
      />
      <br />
      <IconCircle
          icon="rocket"
          size="xl"
          {...props}
      />
    </div>
  )
}

export default IconCircleSizes
