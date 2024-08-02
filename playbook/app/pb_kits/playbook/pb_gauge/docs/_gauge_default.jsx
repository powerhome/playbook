import React from 'react'
import { Gauge } from 'playbook-ui'

const data = [
  { name: 'Name', value: 45 },
]

const GaugeDefault = (props) => (
  <div>
    <Gauge
        chartData={data}
        id="gauge-default"
        {...props}
    />
  </div>
)

export default GaugeDefault
