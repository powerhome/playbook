import React from 'react'
import { Body } from '../../'

const BodyLight = (props) => {
  return (
    <div>
      <Body
          {...props}
          text="I am a body kit (Default)"
      />
      <Body
          {...props}
          color="light"
          text="I am a body kit (Light)"
      />
      <Body
          {...props}
          color="lighter"
          text="I am a body kit (Lighter)"
      />
      <Body
          {...props}
          status="negative"
          text="I am a body kit (Status: negative)"
      />
      <Body
          {...props}
          status="positive"
          text="I am a body kit (Status: positive)"
      />
    </div>
  )
}

export default BodyLight
