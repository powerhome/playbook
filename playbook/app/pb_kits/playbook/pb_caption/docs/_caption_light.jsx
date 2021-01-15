import React from 'react'
import { Caption } from '../../'

const CaptionLight = (props) => {
  return (
    <div>
      <Caption
          text="Caption"
          {...props}
      />
      <Caption
          size="lg"
          text="Caption Large"
          {...props}
      />
      <Caption
          size="xs"
          text="Subcaption"
          {...props}
      />
    </div>
  )
}

export default CaptionLight
