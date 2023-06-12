import React from 'react'
import { Detail } from '../..'

const DetailBolded = (props) => (
  <div>
    <Detail {...props}>
        <b>{"I am a bolded detail kit (Default)"}</b>
    </Detail>

    <Detail
        color="default"
        {...props}
    >
        <b>{"I am a bolded detail kit (Default as a color)"}</b>
    </Detail>

    <Detail
        color="lighter"
        {...props}
    >
        <b>{"I am a bolded detail kit (Lighter)"}</b>
    </Detail>

    <Detail
        color="link"
        {...props}
    >
        <b>{"I am a bolded detail kit (Link)"}</b>
    </Detail>

    <Detail
        color="error"
        {...props}
    >
        <b>{"I am a bolded detail kit (Error)"}</b>
    </Detail>

    <Detail
        color="success"
        {...props}
    >
        <b>{"I am a bolded detail kit (Success)"}</b>
    </Detail>
  </div>
)

export default DetailBolded
