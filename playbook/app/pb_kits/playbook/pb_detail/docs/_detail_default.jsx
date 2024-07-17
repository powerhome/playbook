import React from 'react'
import { Detail } from '../..'

const DetailDefault = (props) => (
  <div>
    <Detail
        text="I am a detail kit"
        {...props}
    />
  </div>
)

export default DetailDefault
