import React from 'react'
import { Caption } from '../../'

function CaptionDark() {
  return (
    <div>
      <Caption
          dark
          text="Caption"
      />
      <Caption
          dark
          size="lg"
          text="Caption Large"
      />
      <Caption
          dark
          size="xs"
          text="Subcaption"
      />
    </div>
  )
}

export default CaptionDark
