import React from 'react'
import Gauge from '../../pb_gauge/_gauge'

const GaugeHeight = (props) => (
  <div>
    <Gauge
        chartData={[ { name: 'Pixels', value: 400 } ]}
        height="400"
        id="gauge-height-px"
        suffix="px"
        title="Fixed Height in Pixels"
        {...props}
    />
    <Gauge
        chartData={[ { name: 'Percentage', value: 45 } ]}
        height="45%"
        id="gauge-height-percent"
        suffix="%"
        title="Height as Percentage of Width"
        {...props}
    />
  </div>
)

export default GaugeHeight
