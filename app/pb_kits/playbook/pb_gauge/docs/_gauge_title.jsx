import React from 'react'
import { Gauge } from '../../'

const chartData = [
  { name: 'Point1', value: 74 },
]

const GaugeTitle = () => (
  <div>
    <Gauge
        chartData={chartData}
        id="gauge-title"
        subtitle="Subtitle"
        title="Title"
    />
  </div>
)

export default GaugeTitle
