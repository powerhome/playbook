import React from 'react'
import { Body, Icon } from '../../'

const IconDefaultDark = (props) => {
  return (
    <div>
      <Body dark>
        <Icon
            fixedWidth
            icon="user"
            {...props}
        />
      </Body>
    </div>
  )
}

export default IconDefaultDark
