import React from 'react'
import { IconValue } from '../../'

const IconValueAlignDark = () => {
  return (
    <div>
      <IconValue
          dark
          icon="heart"
          text="93"
      />

      <br />

      <IconValue
          align="center"
          dark
          icon="comment"
          text="5"
      />

      <br />

      <IconValue
          align="right"
          dark
          icon="clock"
          text="15min"
      />
    </div>
  )
}

export default IconValueAlignDark
