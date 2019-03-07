import React from "react"
import Body from "../_body.jsx"

function BodyLight() {
  return (
    <div>
      <Body>{`I am a body kit (Default)`}</Body>
      <Body color="light">{`I am a body kit (Light)`}</Body>
      <Body color="lighter">{`I am a body kit (Lighter)`}</Body>
    </div>
  )
}

export default BodyLight;
