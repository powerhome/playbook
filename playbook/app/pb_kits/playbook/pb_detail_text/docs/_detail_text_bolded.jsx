import React from 'react'
import { DetailText } from '../..'

const DetailTextBolded = (props) => (
  <div>
    <DetailText {...props}>
      <b>{"I am a bolded detail text kit"}</b>
    </DetailText>

    <DetailText
        color="default"
        {...props}
    >
      <b>{"I am a bolded detail text kit"}</b>
    </DetailText>

    <DetailText
        color="lighter"
        {...props}
    >
      <b>{"I am a bolded detail text kit"}</b>
    </DetailText>

    <DetailText
        color="link"
        {...props}
    >
      <b>{"I am a bolded detail text kit"}</b>
    </DetailText>

    <DetailText
        color="error"
        {...props}
    >
      <b>{"I am a bolded detail text kit"}</b>
    </DetailText>

    <DetailText
        color="success"
        {...props}
    >
      <b>{"I am a bolded detail text kit"}</b>
    </DetailText>
  </div>
)

export default DetailTextBolded
