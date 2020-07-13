import React from 'react'
import { Gauge } from '../../'

const GaugeHeight = () => (
  <div>
    <Gauge
        chartData={[ { name: 'Name', value: 400 } ]}
        height="400"
        id="gauge-height-px"
        suffix="px"
        title="Fixed Height in Pixels"
    />
    <Gauge
        chartData={[ { name: 'Name', value: 45 } ]}
        height="45%"
        id="gauge-height-percent"
        suffix="%"
        title="Height as Percentage of Width"
    />
  </div>
)

export default GaugeHeight
