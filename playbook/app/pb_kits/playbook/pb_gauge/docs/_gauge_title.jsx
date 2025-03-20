import React from 'react'
import Gauge from '../../pb_gauge/_gauge'

const data = [
  { name: 'Score', value: 780 },
]

const GaugeTitle = (props) => (
  <div>
    <Gauge
        chartData={data}
        id="gauge-title"
        max={850}
        min={300}
        title="Credit Score"
        {...props}
    />
  </div>
)

export default GaugeTitle
