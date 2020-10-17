import React from 'react'
import { IconValue } from '../../'

const IconValueDark = () => {
  return (
    <div>
      <IconValue
          dark
          icon="clipboard"
          text="33-123456"
      />

      <br />

      <IconValue
          dark
          icon="heart"
          text="93"
      />

      <br />

      <IconValue
          dark
          icon="clock"
          text="15min"
      />
    </div>
  )
}

export default IconValueDark
