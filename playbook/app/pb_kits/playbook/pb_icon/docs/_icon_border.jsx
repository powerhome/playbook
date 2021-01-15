import React from 'react'
import { Icon } from '../../'

const IconBorder = (props) => {
  return (
    <div>
      <Icon
          border
          fixedWidth
          icon="user"
          size="2x"
          {...props}
      />
    </div>
  )
}

export default IconBorder
