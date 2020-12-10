import React from 'react'
import { StatChange } from '../../'

const StatChangeUnitTwo = () => {
  return (
    <div>
      <StatChange
          change="increase"
          icon="level-up"
          value="28.4"
      />

      <br />

      <StatChange
          change="decrease"
          icon="level-down"
          value={6.1}
      />

      <br />

      <StatChange
          change="neutral"
          value={102}
      />
    </div>
  )
}

export default StatChangeUnitTwo
