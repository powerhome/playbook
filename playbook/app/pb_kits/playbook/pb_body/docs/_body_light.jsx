import React from 'react'
import { Body } from 'playbook-ui'

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
          color="error"
          text="I am a body kit (Error)"
          {...props}
      />
      <Body
          color="success"
          text="I am a body kit (Success)"
          {...props}
      />
    </div>
  )
}

export default BodyLight
