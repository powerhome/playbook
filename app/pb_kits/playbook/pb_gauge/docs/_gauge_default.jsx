import React from 'react'
import { Gauge } from '../../'

const data = [
  { name: 'Point1', value: 45 },
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
