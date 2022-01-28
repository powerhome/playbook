import React from 'react'
import { Caption } from '../../'

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
          color="link"
          text="Test colors"
          {...props}
      />
    </div>
  )
}

export default CaptionColors
