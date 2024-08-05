import React from 'react'
import { StatChange } from 'playbook-ui'

const StatChangeUnit = (props) => {
  return (
    <div>
      <StatChange
          icon="chart-line"
          value="28.4"
          {...props}
      />

      <br />

      <StatChange
          icon="chart-line-down"
          value={6.1}
          {...props}
      />

      <br />

      <StatChange
          value={102}
          {...props}
      />
    </div>
  )
}

export default StatChangeUnit
