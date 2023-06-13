import React from 'react'
import { DetailText } from '../..'

const DetailTextColors = (props) => (
  <div>
    <DetailText
        color="default"
        text="I am a detail text kit (Default as a color)"
        {...props}
    />

    <DetailText
        color="lighter"
        text="I am a detail text kit (Lighter)"
        {...props}
    />

    <DetailText
        color="link"
        text="I am a detail text kit (Link)"
        {...props}
    />

    <DetailText
        color="error"
        text="I am a detail text kit (Error)"
        {...props}
    />

    <DetailText
        color="success"
        text="I am a detail text kit (Success)"
        {...props}
    />
  </div>
)

export default DetailTextColors
