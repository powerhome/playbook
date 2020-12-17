import React from 'react'
import { StatChange } from '../../'

const StatChangeUnit = () => {
  return (
    <div>
      <StatChange
          icon="chart-line"
          value="28.4"
      />

      <br />

      <StatChange
          icon="chart-line-down"
          value={6.1}
      />

      <br />

      <StatChange
          value={102}
      />
    </div>
  )
}

export default StatChangeUnit
