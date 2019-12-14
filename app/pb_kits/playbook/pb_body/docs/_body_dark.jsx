import React from 'react'
import { Body } from '../../'

const BodyDark = () => {
  return (
    <div>
      <Body
          dark
          text="I am a body kit (Default)"
      />
      <Body
          color="light"
          dark
          text="I am a body kit (Light)"
      />
      <Body
          color="lighter"
          dark
          text="I am a body kit (Lighter)"
      />
      <br />
      <br />
      <Body
          dark
          status="negative"
          text="I am a body kit (Status: negative)"
      />
      <Body
          dark
          status="positive"
          text="I am a body kit (Status: positive)"
      />
    </div>
  )
}

export default BodyDark
