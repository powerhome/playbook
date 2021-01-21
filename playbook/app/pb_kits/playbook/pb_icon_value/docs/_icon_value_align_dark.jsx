import React from 'react'
import { IconValue } from '../../'

const IconValueAlignDark = (props) => {
  return (
    <div>
      <IconValue
          dark
          icon="heart"
          text="93"
          {...props}
      />

      <br />

      <IconValue
          align="center"
          dark
          icon="comment"
          text="5"
          {...props}
      />

      <br />

      <IconValue
          align="right"
          dark
          icon="clock"
          text="15min"
          {...props}
      />
    </div>
  )
}

export default IconValueAlignDark
