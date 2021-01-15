import React from 'react'
import { DashboardValue } from '../../'

const DashboardValueAlign = (props) => {
  return (
    <div>
      <DashboardValue
          statChange={{ change: 'decrease', value: '26.1' }}
          statLabel="Top Title Value"
          statValue={{ value: '1,428', unit: 'appts' }}
          {...props}
      />

      <br />
      <br />

      <DashboardValue
          align="center"
          statChange={{ change: 'decrease', value: 56.1 }}
          statLabel="Top Title Value"
          statValue={{ value: '1,428', unit: 'appts' }}
          {...props}
      />

      <br />
      <br />

      <DashboardValue
          align="right"
          statChange={{ change: 'decrease', value: 86 }}
          statLabel="Top Title Value"
          statValue={{ value: '1,428', unit: 'appts' }}
          {...props}
      />
    </div>
  )
}

export default DashboardValueAlign
