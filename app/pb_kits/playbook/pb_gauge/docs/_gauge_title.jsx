import React from 'react'
import { Gauge } from '../../'

const chartData = [
  { name: 'Score', value: 780 },
]

const GaugeTitle = () => (
  <div>
    <Gauge
        chartData={chartData}
        id="gauge-title"
        max={850}
        min={300}
        subtitle="Experian"
        title="Credit Score"
    />
  </div>
)

export default GaugeTitle
