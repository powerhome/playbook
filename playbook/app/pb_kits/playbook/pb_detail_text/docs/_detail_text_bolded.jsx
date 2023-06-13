import React from 'react'
import { DetailText } from '../..'

const DetailTextBolded = (props) => (
  <div>
    <DetailText {...props}>
      <b>{"I am a bolded detail text kit (Default)"}</b>
    </DetailText>

    <DetailText
        color="default"
        {...props}
    >
      <b>{"I am a bolded detail text kit (Default as a color)"}</b>
    </DetailText>

    <DetailText
        color="lighter"
        {...props}
    >
      <b>{"I am a bolded detail text kit (Lighter)"}</b>
    </DetailText>

    <DetailText
        color="link"
        {...props}
    >
      <b>{"I am a bolded detail text kit (Link)"}</b>
    </DetailText>

    <DetailText
        color="error"
        {...props}
    >
      <b>{"I am a bolded detail text kit (Error)"}</b>
    </DetailText>

    <DetailText
        color="success"
        {...props}
    >
      <b>{"I am a bolded detail text kit (Success)"}</b>
    </DetailText>
  </div>
)

export default DetailTextBolded
