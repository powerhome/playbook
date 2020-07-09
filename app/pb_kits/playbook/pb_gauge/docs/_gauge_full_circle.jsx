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
        title="Seating Capacity"
        units="{y}%"
    />
  </div>
)

export default GaugeFullCircle
