import React from 'react'
import { IconValue } from '../../'

const IconValueDefault = (props) => {
  return (
    <div>
      <IconValue
          icon="clipboard"
          text="33-123456"
          {...props}
      />

      <br />

      <IconValue
          icon="heart"
          text="93"
          {...props}
      />

      <br />

      <IconValue
          icon="clock"
          text="15min"
          {...props}
      />
    </div>
  )
}

export default IconValueDefault
