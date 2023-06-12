import React from 'react'
import { Detail } from '../../'

const DetailDefault = (props) => (
  <div>
    <Detail
        text="I am a detail kit (Default)"
        {...props}
    />

    <Detail
        color="default"
        text="I am a detail kit (Default as a color)"
        {...props}
    />

    <Detail
        color="lighter"
        text="I am a detail kit (Lighter)"
        {...props}
    />

    <Detail
        color="link"
        text="I am a detail kit (Link)"
        {...props}
    />

    <Detail
        color="error"
        text="I am a detail kit (Error)"
        {...props}
    />

    <Detail
        color="success"
        text="I am a detail kit (Success)"
        {...props}
    />
  </div>
)

export default DetailDefault
