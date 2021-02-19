import React from 'react'
import { Icon } from '../../'

const IconPull = (props) => {
  return (
    <div>
      <Icon
          fixedWidth
          icon="arrow-left"
          pull="left"
          size="2x"
          {...props}
      />
      <Icon
          fixedWidth
          icon="arrow-right"
          pull="right"
          size="2x"
          {...props}
      />
    </div>
  )
}

export default IconPull
