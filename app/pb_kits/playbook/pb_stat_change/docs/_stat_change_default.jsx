import React from 'react'
import { StatChange } from '../../'

const StatChangeDefault = () => {
  return (
    <div>
      <StatChange
          change="increase"
          value="28.4"
      />

      <br />

      <StatChange
          change="decrease"
          value={6.1}
      />

      <br />

      <StatChange
          change="neutral"
          value={98}
      />
    </div>
  )
}

export default StatChangeDefault
