import React from 'react'
import Caption from "../../pb_caption/_caption"

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
