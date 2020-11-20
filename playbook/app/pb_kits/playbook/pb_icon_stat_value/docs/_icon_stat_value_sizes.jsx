import React from 'react'
import { IconStatValue } from '../../'

const IconStatValueSizes = () => {
  return (
    <div>
      <IconStatValue
          icon="car"
          size="sm"
          text="distance driven"
          unit="mi"
          value={158.3}
      />
      <br />
      <IconStatValue
          icon="car"
          size="md"
          text="distance driven"
          unit="mi"
          value={158.3}
      />
      <br />
      <IconStatValue
          icon="car"
          size="lg"
          text="distance driven"
          unit="mi"
          value={158.3}
      />
    </div>

  )
}

export default IconStatValueSizes
