import React from 'react'
import IconStatValue from '../../pb_icon_stat_value/_icon_stat_value'

const IconStatValueSizes = (props) => {
  return (
    <div>
      <IconStatValue
          icon="car"
          size="sm"
          text="distance driven"
          unit="mi"
          value={158.3}
          {...props}
      />
      <br />
      <IconStatValue
          icon="car"
          size="md"
          text="distance driven"
          unit="mi"
          value={158.3}
          {...props}
      />
      <br />
      <IconStatValue
          icon="car"
          size="lg"
          text="distance driven"
          unit="mi"
          value={158.3}
          {...props}
      />
    </div>

  )
}

export default IconStatValueSizes
