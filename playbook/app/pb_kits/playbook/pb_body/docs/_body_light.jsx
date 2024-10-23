import React from 'react'
import { Body, Card } from 'playbook-ui'

const BodyLight = (props) => {
  return (
    <Card hoverGroup>
      <Body
          hover={{ scale: "lg"}}
          text="I am a body kit (Default)"
          {...props}
      />
      <Body
          color="light"
          hover={{ scale: "lg"}}
          hoverDirect
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
    </Card>
  )
}

export default BodyLight
