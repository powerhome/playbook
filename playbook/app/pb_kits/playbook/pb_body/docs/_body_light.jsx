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
          status="error"
          text="I am a body kit (Status: error)"
          {...props}
      />
      <Body
          status="success"
          text="I am a body kit (Status: success)"
          {...props}
      />
    </div>
  )
}

export default BodyLight
