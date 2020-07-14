import React from 'react'
import { Gauge } from '../../'

const data = [
  { name: 'Score', value: 780 },
]

const GaugeTitle = () => (
  <div>
    <Gauge
        chartData={data}
        id="gauge-title"
        max={850}
        min={300}
        subtitle="Experian"
        title="Credit Score"
    />
  </div>
)

export default GaugeTitle
