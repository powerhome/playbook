import React from 'react'
import { Detail } from '../..'

const DetailBolded = (props) => (
  <div>
    <Detail {...props}>
      <b>{"I am a bolded detail kit"}</b>
    </Detail>

    <Detail
        color="default"
        {...props}
    >
      <b>{"I am a bolded detail kit"}</b>
    </Detail>

    <Detail
        color="lighter"
        {...props}
    >
      <b>{"I am a bolded detail kit"}</b>
    </Detail>

    <Detail
        color="link"
        {...props}
    >
      <b>{"I am a bolded detail kit"}</b>
    </Detail>

    <Detail
        color="error"
        {...props}
    >
      <b>{"I am a bolded detail kit"}</b>
    </Detail>

    <Detail
        color="success"
        {...props}
    >
      <b>{"I am a bolded detail kit"}</b>
    </Detail>
  </div>
)

export default DetailBolded
