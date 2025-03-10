import React from 'react'
import Caption from "../../pb_caption/_caption"

const CaptionColors = (props) => {
  return (
    <div>
      <Caption
          text="Test colors"
          {...props}
      />
      <Caption
          color="success"
          text="Test colors"
          {...props}
      />
      <Caption
          color="error"
          text="Test colors"
          {...props}
      />
      <Caption
          color="link"
          text="Test colors"
          {...props}
      />
    </div>
  )
}

export default CaptionColors
