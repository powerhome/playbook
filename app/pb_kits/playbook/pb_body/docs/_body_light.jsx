import React from "react"
import Body from "../_body.jsx"

function BodyLight() {
  return (
    <div>
      <Body text="I am a body kit (Default)" />
      <Body color="light" text="I am a body kit (Light)" />
      <Body color="lighter" text="I am a body kit (Lighter)" />
    </div>
  )
}

export default BodyLight;
