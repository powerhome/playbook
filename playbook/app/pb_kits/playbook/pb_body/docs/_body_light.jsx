import React from 'react'
import { Body } from '../../'

const BodyLight = (props) => {
  return (
    <div>
      <Body
          text="I am a body kit (Default)"
          {...props}
      />
      <Body
          color="light"
          text="I am a body kit (Light)"
          {...props}
      />
      <Body
          color="lighter"
          text="I am a body kit (Lighter)"
          {...props}
      />
      <Body
          color="link"
          text="I am a body kit (Link)"
          {...props}
      />
      <Body
          status="negative"
          text="I am a body kit (Status: negative)"
          {...props}
      />
      <Body
          status="positive"
          text="I am a body kit (Status: positive)"
          {...props}
      />
    </div>
  )
}

export default BodyLight
