import React from 'react'
import Detail from '../../pb_detail/_detail'

const DetailDefault = (props) => (
  <div>
    <Detail
        text="I am a detail kit"
        {...props}
    />
  </div>
)

export default DetailDefault
