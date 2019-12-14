import React from 'react'
import { Caption } from '../../'

function CaptionLight() {
  return (
    <div>
      <Caption text="Caption" />
      <Caption
          size="lg"
          text="Caption Large"
      />
      <Caption
          size="xs"
          text="Subcaption"
      />
    </div>
  )
}

export default CaptionLight
