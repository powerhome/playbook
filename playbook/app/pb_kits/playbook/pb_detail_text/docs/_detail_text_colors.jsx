import React from 'react'
import { DetailText } from '../..'

const DetailTextColors = (props) => (
  <div>
    <DetailText
        color="default"
        text="I am a detail text kit"
        {...props}
    />

    <DetailText
        color="lighter"
        text="I am a detail text kit"
        {...props}
    />

    <DetailText
        color="link"
        text="I am a detail text kit"
        {...props}
    />

    <DetailText
        color="error"
        text="I am a detail text kit"
        {...props}
    />

    <DetailText
        color="success"
        text="I am a detail text kit"
        {...props}
    />
  </div>
)

export default DetailTextColors
