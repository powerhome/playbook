import React from 'react'
import { IconValue } from '../../'

const IconValueAlign = (props) => {
  return (
    <div>
      <IconValue
          icon="heart"
          text="93"
          {...props}
      />

      <br />

      <IconValue
          align="center"
          icon="comment"
          text="5"
          {...props}
      />

      <br />

      <IconValue
          align="right"
          icon="clock"
          text="15min"
          {...props}
      />
    </div>
  )
}

export default IconValueAlign
