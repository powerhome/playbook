import React from 'react'
import Detail from '../../pb_detail/_detail'

const DetailColors = (props) => {
  return (
    <div>
      <Detail
          text="I am a detail kit"
          {...props}
      />
      <Detail
          color="default"
          text="I am a detail kit"
          {...props}
      />
      <Detail
          color="lighter"
          text="I am a detail kit"
          {...props}
      />
      <Detail
          color="link"
          text="I am a detail kit"
          {...props}
      />
      <Detail
          color="error"
          text="I am a detail kit"
          {...props}
      />
      <Detail
          color="success"
          text="I am a detail kit"
          {...props}
      />
    </div>
  )
}

export default DetailColors
