import React from 'react'
import { Caption } from '../../'

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
