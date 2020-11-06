import React from 'react'
import { Caption } from '../../'

const CaptionLight = (props) => {
  return (
    <div>
      <Caption
          {...props}
          text="Caption"
      />
      <Caption
          {...props}
          size="lg"
          text="Caption Large"
      />
      <Caption
          {...props}
          size="xs"
          text="Subcaption"
      />
    </div>
  )
}

export default CaptionLight
