import React from "react"
import { Body } from "../../"

function BodyLight() {
  return (
    <div>
      <Body text="I am a body kit (Default)" />
      <Body
          color="light"
          text="I am a body kit (Light)"
      />
      <Body
          color="lighter"
          text="I am a body kit (Lighter)"
      />
      <br />
      <br />
      <Body
          status="negative"
          text="I am a body kit (Status: negative)"
      />
      <Body
          status="positive"
          text="I am a body kit (Status: positive)"
      />
    </div>
  )
}

export default BodyLight
