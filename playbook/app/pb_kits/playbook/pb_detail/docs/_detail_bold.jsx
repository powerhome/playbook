import React from 'react'
import Detail from '../../pb_detail/_detail'

const DetailBold = (props) => (
  <div>
    <Detail
        bold
        text="I am a bold detail kit"
        {...props}
    />

    <Detail
        bold
        color="default"
        text="I am a bold detail kit"
        {...props}
    />

    <Detail
        bold
        color="lighter"
        text="I am a bold detail kit"
        {...props}
    />

    <Detail
        bold
        color="link"
        text="I am a bold detail kit"
        {...props}
    />

    <Detail
        bold
        color="error"
        text="I am a bold detail kit"
        {...props}
    />

    <Detail
        bold
        color="success"
        text="I am a bold detail kit"
        {...props}
    />
  </div>
)

export default DetailBold
