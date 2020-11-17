import React from 'react'
import { IconStatValue } from '../../'

const IconStatValueColor = () => {
  return (
    <div>
      <IconStatValue
          icon="globe-europe"
          text="Mercury"
          unit="AU"
          value={0.39}
          variant="blue"
      />
      <br />
      <IconStatValue
          icon="planet-ringed"
          text="Venus"
          unit="AU"
          value={0.723}
          variant="royal"
      />
      <br />
      <IconStatValue
          icon="planet-moon"
          text="Earth"
          unit="AU"
          value={1.0}
          variant="purple"
      />
      <br />
      <IconStatValue
          icon="solar-system"
          text="Mars"
          unit="AU"
          value={1.524}
          variant="teal"
      />
      <br />
      <IconStatValue
          icon="globe-americas"
          text="Jupitar"
          unit="AU"
          value={5.203}
          variant="red"
      />
      <br />
      <IconStatValue
          icon="globe-africa"
          text="Saturn"
          unit="AU"
          value={9.539}
          variant="yellow"
      />
      <br />
      <IconStatValue
          icon="globe"
          text="Uranus"
          unit="AU"
          value={19.18}
          variant="green"
      />
    </div>

  )
}

export default IconStatValueColor
