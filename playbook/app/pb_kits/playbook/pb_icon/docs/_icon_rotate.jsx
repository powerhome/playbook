import React from 'react'
import { Icon } from '../../'

const IconRotate = (props) => {
  return (
    <div>
      <Icon
          fixedWidth
          icon="user"
          rotation={90}
          size="2x"
          {...props}
      />
      <Icon
          fixedWidth
          icon="user"
          rotation={180}
          size="2x"
          {...props}
      />
      <Icon
          fixedWidth
          icon="user"
          rotation={270}
          size="2x"
          {...props}
      />
    </div>
  )
}

export default IconRotate
