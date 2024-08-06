import React from 'react'
import { Gauge } from 'playbook-ui'

const data = [
  { name: 'Capacity', value: 75 },
]

const GaugeFullCircle = (props) => (
  <div>
    <Gauge
        chartData={data}
        fullCircle
        id="gauge-full-circle"
        suffix="%"
        title="Seating Capacity"
        {...props}
    />
  </div>
)

export default GaugeFullCircle
