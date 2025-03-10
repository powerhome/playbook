import React from 'react'
import IconStatValue from '../../pb_icon_stat_value/_icon_stat_value'

const IconStatValueVertical = (props) => {
  return (
    <div>
      <IconStatValue
          icon="broadcast-tower"
          orientation="vertical"
          text="Radio"
          unit="wkz"
          value={102.5}
          {...props}
      />
    </div>

  )
}

export default IconStatValueVertical
