import React from 'react'
import { IconStatValue } from '../../'

const IconStatValueDefault = () => {
  return (
    <div>
      <IconStatValue
          icon="user"
          text="ELECTRIC"
          unit="%"
          value={64.18}
          variant="teal"
      />
      <br />
      <IconStatValue
          icon="lightbulb-on"
          text="DISTANCE DRIVEN"
          value={158.3}
          variant="teal"
      />
      <br />
      <br />
      <IconStatValue
          icon="user"
          text="DISTANCE DRIVEN"
          value={158.3}
          variant="teal"
      />
      <br />
      <IconStatValue
          icon="lightbulb-on"
          text="DISTANCE DRIVEN"
          value={158.3}
          variant="teal"
      />
    </div>

  )
}

export default IconStatValueDefault
