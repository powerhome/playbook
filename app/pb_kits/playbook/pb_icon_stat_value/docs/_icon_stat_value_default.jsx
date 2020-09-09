import React from 'react'
import { IconStatValue } from '../../'

const IconStatValueDefault = () => {
  return (
    <div>
      <IconStatValue
          icon="user"
          value={64.18}
          unit="%"
          variant="yellow"
          text = "Electric"
      >
      </IconStatValue>
      <br />
      <IconStatValue
          icon="lightbulb-on"
          text="DISTANCE DRIVEN"
          value={158.3}
          unit="mi"
          variant="teal"
          size="lg"
      />
      <br />
      <br />
      <IconStatValue
          icon="user"
          text="DISTANCE DRIVEN"
          value={158.3}
          unit="mi"
          variant="purple"
          size="sm"
          orientation="vertical"
      />
      <br />
      <IconStatValue
          icon="lightbulb-on"
          text="DISTANCE DRIVEN"
          value={158.3}
          unit="mi"
          variant="royal"
          size="lg"
          orientation="vertical"
      />
    </div>

  )
}

export default IconStatValueDefault
