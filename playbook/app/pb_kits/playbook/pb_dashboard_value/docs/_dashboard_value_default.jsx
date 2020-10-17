import React from 'react'
import { DashboardValue } from '../../'

const DashboardValueDefault = (props) => {
  return (
    <div>
      <DashboardValue
          {...props}
          statChange={{ change: 'decrease', value: '26.1' }}
          statLabel="Decreased Value"
          statValue={{ value: '1,428', unit: 'appts' }}
      />

      <br />
      <br />

      <DashboardValue
          {...props}
          statChange={{ change: 'increase', value: 56.1 }}
          statLabel="Increased Value"
          statValue={{ value: '938', unit: 'homes' }}
      />

      <br />
      <br />

      <DashboardValue
          {...props}
          statChange={{ value: 86 }}
          statLabel="Neutral Value"
          statValue={{ value: '261', unit: 'windows' }}
      />
    </div>
  )
}

export default DashboardValueDefault
