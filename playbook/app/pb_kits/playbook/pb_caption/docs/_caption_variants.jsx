import React from 'react'
import { Caption } from '../../'

const CaptionVariants = (props) => {
  return (
    <div>
      <Caption
          color="success"
          size="xs"
          text="Subcaption (link)"
          variant="link"
          {...props}
      />
    </div>
  )
}

export default CaptionVariants
