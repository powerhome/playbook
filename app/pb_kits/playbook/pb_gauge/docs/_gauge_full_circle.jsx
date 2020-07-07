import React from 'react'
import { Gauge } from '../../'

const chartData = [
  { name: 'Point1', value: 45 },
]

const GaugeFullCircle = () => (
  <div>
    <Gauge
        chartData={chartData}
        fullCircle
        id="gauge-full-circle"
    />
  </div>
)

export default GaugeFullCircle
