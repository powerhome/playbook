import React from 'react'
import { Gauge } from '../../'

const GaugeHeight = () => (
  <div>
    <Gauge
        chartData={[ { name: 'Name', value: 400 } ]}
        height="400"
        id="gauge-height-px"
        title="Fixed Height in Pixels"
        units="px"
    />
    <Gauge
        chartData={[ { name: 'Name', value: 45 } ]}
        height="45%"
        id="gauge-height-percent"
        title="Height as Percentage of Width"
        units="%"
    />
  </div>
)

export default GaugeHeight
