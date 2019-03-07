import React from "react"
import Body from "../_body.jsx"

function BodyDark() {
  return (
    <div>
      <Body dark>{`I am a body kit (Default)`}</Body>
      <Body color="light" dark>{`I am a body kit (Light)`}</Body>
      <Body color="lighter" dark>{`I am a body kit (Lighter)`}</Body>
    </div>
  )
}

export default BodyDark;
