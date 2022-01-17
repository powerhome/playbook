
import React from 'react'
import Caption from '../_caption'

const CaptionExample = (props) => {
  return (
    <div>
      <Caption
          color="default"
          text="Text Default"
          {...props}
      />
      <Caption
          color="light"
          text="Text Light"
          {...props}
      />
      <Caption
          color="lighter"
          text="Text Lighter"
          {...props}
      />
      <Caption
          color="success"
          text="Text Success"
          {...props}
      />
      <Caption
          color="error"
          text="Text Error"
          {...props}
      />
      <Caption
          color="link"
          text="Text Link"
          {...props}
      />
    </div>
  )
}

export default CaptionExample
