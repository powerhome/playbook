import React from 'react'
import Caption from '../_caption'

const CaptionExample = (props) => {
  return (
    <div>
      <Caption
          color="default"
          text="text default"
          {...props}
      />
      <Caption
          color="light"
          text="text light"
          {...props}
      />
      <Caption
          color="link"
          text="text link"
          {...props}
      />
    </div>
  )
}

export default CaptionExample
