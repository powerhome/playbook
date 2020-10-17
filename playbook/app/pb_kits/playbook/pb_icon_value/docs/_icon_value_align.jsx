import React from 'react'
import { IconValue } from '../../'

const IconValueAlign = () => {
  return (
    <div>
      <IconValue
          icon="heart"
          text="93"
      />

      <br />

      <IconValue
          align="center"
          icon="comment"
          text="5"
      />

      <br />

      <IconValue
          align="right"
          icon="clock"
          text="15min"
      />
    </div>
  )
}

export default IconValueAlign
