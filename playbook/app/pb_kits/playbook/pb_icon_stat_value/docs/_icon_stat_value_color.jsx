import React from 'react'
import { IconStatValue } from '../../'

const IconStatValueColor = (props) => {
  return (
    <div>
      <IconStatValue
          icon="globe-europe"
          text="Mercury"
          unit="AU"
          value={0.39}
          variant="blue"
          {...props}
      />
      <br />
      <IconStatValue
          icon="planet-ringed"
          text="Venus"
          unit="AU"
          value={0.723}
          variant="royal"
          {...props}
      />
      <br />
      <IconStatValue
          icon="planet-moon"
          text="Earth"
          unit="AU"
          value={1.0}
          variant="purple"
          {...props}
      />
      <br />
      <IconStatValue
          icon="solar-system"
          text="Mars"
          unit="AU"
          value={1.524}
          variant="teal"
          {...props}
      />
      <br />
      <IconStatValue
          icon="globe-americas"
          text="Jupitar"
          unit="AU"
          value={5.203}
          variant="red"
          {...props}
      />
      <br />
      <IconStatValue
          icon="globe-africa"
          text="Saturn"
          unit="AU"
          value={9.539}
          variant="yellow"
          {...props}
      />
      <br />
      <IconStatValue
          icon="globe"
          text="Uranus"
          unit="AU"
          value={19.18}
          variant="green"
          {...props}
      />
    </div>

  )
}

export default IconStatValueColor
