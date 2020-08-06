import React from 'react'
import { Gauge } from '../../'

const data = [
  { name: 'Name', value: 45 },
]

const GaugeDefault = () => (
  <div>
    <Gauge
        chartData={data}
        id="gauge-default"
    />
  </div>
)

export default GaugeDefault
