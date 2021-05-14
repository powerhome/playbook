import React from 'react'

import DashboardValue from '../../pb_dashboard_value/_dashboard_value'

const DashboardValueDefault = (props) => {
  return (
    <div>
      <DashboardValue
          statChange={{ change: 'decrease', value: '26.1' }}
          statLabel="Decreased Value"
          statValue={{ value: '1,428', unit: 'appts' }}
          {...props}
      />

      <br />
      <br />

      <DashboardValue
          statChange={{ change: 'increase', value: 56.1 }}
          statLabel="Increased Value"
          statValue={{ value: '938', unit: 'homes' }}
          {...props}
      />

      <br />
      <br />

      <DashboardValue
          statChange={{ value: 86 }}
          statLabel="Neutral Value"
          statValue={{ value: '261', unit: 'windows' }}
          {...props}
      />
    </div>
  )
}

export default DashboardValueDefault
