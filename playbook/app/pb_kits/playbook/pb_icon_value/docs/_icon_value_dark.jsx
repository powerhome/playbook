import React from 'react'
import { IconValue } from '../../'

const IconValueDark = (props) => {
  return (
    <div>
      <IconValue
          dark
          icon="clipboard"
          text="33-123456"
          {...props}
      />

      <br />

      <IconValue
          dark
          icon="heart"
          text="93"
          {...props}
      />

      <br />

      <IconValue
          dark
          icon="clock"
          text="15min"
          {...props}
      />
    </div>
  )
}

export default IconValueDark
