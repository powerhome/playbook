import React from 'react'
import { Icon } from '../../'

const IconFlip = (props) => {
  return (
    <div>
      <Icon
          fixedWidth
          flip="horizontal"
          icon="question-circle"
          size="2x"
          {...props}
      />
      <Icon
          fixedWidth
          flip="vertical"
          icon="question-circle"
          size="2x"
          {...props}
      />
      <Icon
          fixedWidth
          flip="both"
          icon="question-circle"
          size="2x"
          {...props}
      />
    </div>
  )
}

export default IconFlip
