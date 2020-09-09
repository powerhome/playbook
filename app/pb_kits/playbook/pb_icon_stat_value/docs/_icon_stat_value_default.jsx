import React from 'react'
import { IconStatValue } from '../../'

const IconStatValueDefault = () => {
  return (
    <div>
      <IconStatValue
          icon="user"
          text="Electric"
          unit="%"
          value={64.18}
          variant="yellow"
      />
      <br />
      <IconStatValue
          icon="lightbulb-on"
          size="lg"
          text="DISTANCE DRIVEN"
          unit="mi"
          value={158.3}
          variant="teal"
      />
      <br />
      <br />
      <IconStatValue
          icon="user"
          orientation="vertical"
          size="sm"
          text="DISTANCE DRIVEN"
          unit="mi"
          value={158.3}
          variant="purple"
      />
      <br />
      <IconStatValue
          icon="lightbulb-on"
          orientation="vertical"
          size="lg"
          text="DISTANCE DRIVEN"
          unit="mi"
          value={158.3}
          variant="royal"
      />
    </div>

  )
}

export default IconStatValueDefault
