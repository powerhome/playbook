import React from 'react'
import { Gauge } from '../../'

const chartData = [
  { name: 'Capacity', value: 75 },
]

const GaugeFullCircle = () => (
  <div>
    <Gauge
        chartData={chartData}
        fullCircle
        id="gauge-full-circle"
        suffix="%"
        title="Seating Capacity"
    />
  </div>
)

export default GaugeFullCircle
