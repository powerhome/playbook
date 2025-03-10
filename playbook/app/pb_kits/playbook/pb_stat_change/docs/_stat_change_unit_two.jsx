import React from 'react'
import StatChange from '../../pb_stat_change/_stat_change'

const StatChangeUnitTwo = (props) => {
  return (
    <div>
      <StatChange
          change="increase"
          icon="level-up"
          value="28.4"
          {...props}
      />

      <br />

      <StatChange
          change="decrease"
          icon="level-down"
          value={6.1}
          {...props}
      />

      <br />

      <StatChange
          change="neutral"
          value={102}
          {...props}
      />
    </div>
  )
}

export default StatChangeUnitTwo
