import React from 'react'
import Caption from "../../pb_caption/_caption"

const CaptionBlock = (props) => {
  return (
    <div>
      <Caption {...props}>
        {'Block'}
      </Caption>

      <Caption
          size="lg"
          {...props}
      >
        {'Large Block'}
      </Caption>

      <Caption
          size="xs"
          {...props}
      >
        {'Subcaption Block'}
      </Caption>
    </div>
  )
}

export default CaptionBlock
