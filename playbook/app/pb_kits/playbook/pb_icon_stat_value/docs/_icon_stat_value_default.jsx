import React from 'react'
import IconStatValue from '../../pb_icon_stat_value/_icon_stat_value'

const IconStatValueDefault = (props) => {
  return (
    <div>
      <IconStatValue
          icon="lightbulb-on"
          text="Electric"
          unit="kw"
          value={64.18}
          {...props}
      />
      <br />
      <IconStatValue
          icon="calendar"
          text="deadline"
          unit="days"
          value={24}
          {...props}
      />
    </div>

  )
}

export default IconStatValueDefault
