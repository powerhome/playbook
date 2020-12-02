import React from 'react'
import { StatChange } from '../../'

const StatChangeUnit = () => {
  return (
    <div>
      <StatChange
          change="increase"
          icon="chart-line"
          value="28.4"
      />

      <br />

      <StatChange
          change="decrease"
          icon="chart-line-down"
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

export default StatChangeUnit
