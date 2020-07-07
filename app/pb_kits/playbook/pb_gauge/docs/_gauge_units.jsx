import React from 'react'
import { Gauge } from '../../'

const chartData = [
  { name: 'Sales', value: 32 },
]

const GaugeUnits = () => (
  <div>
    <Gauge
        chartData={chartData}
        id="gauge-units"
        units="%"
    />
  </div>
)

export default GaugeUnits
