import React from 'react'
import { IconStatValue } from '../../'

const IconStatValueDefault = () => {
  return (
    <div>
      <IconStatValue
          icon="lightbulb-on"
          text="Electric"
          unit="kw"
          value={64.18}
      />
      <br />
      <IconStatValue
          icon="calendar"
          text="deadline"
          unit="days"
          value={24}
      />
    </div>

  )
}

export default IconStatValueDefault
