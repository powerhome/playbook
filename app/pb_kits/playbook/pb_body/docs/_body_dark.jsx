import React from "react"
import Body from "../_body.jsx"

function BodyDark() {
  return (
    <div>
      <Body dark text="I am a body kit (Default)" />
      <Body dark color="light" text="I am a body kit (Light)" />
      <Body dark color="lighter" text="I am a body kit (Lighter)" />
    </div>
  )
}

export default BodyDark;
