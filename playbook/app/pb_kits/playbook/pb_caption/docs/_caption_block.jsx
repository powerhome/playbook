import React from 'react'
import { Caption } from '../../'

const CaptionBlock = (props) => {
  return (
    <div>
      <Caption {...props}>
        {'Block'}
      </Caption>

      <Caption
          {...props}
          size="lg"
      >
        {'Large Block'}
      </Caption>

      <Caption
          {...props}
          size="xs"
      >
        {'Subcaption Block'}
      </Caption>
    </div>
  )
}

export default CaptionBlock
