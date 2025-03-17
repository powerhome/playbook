import React from 'react'
import StatChange from '../../pb_stat_change/_stat_change'

const StatChangeDefault = (props) => {
  return (
    <div>
      <StatChange
          change="increase"
          value="28.4"
          {...props}
      />

      <br />

      <StatChange
          change="decrease"
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

export default StatChangeDefault
