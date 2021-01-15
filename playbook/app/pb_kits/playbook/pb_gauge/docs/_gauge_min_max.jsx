import React from 'react'
import { Gauge } from '../../'

const data = [{
  name: 'Rating', value: 4.5,
}]

const GaugeMinMax = (props) => (
  <div>
    <Gauge
        chartData={data}
        id="gauge-min-max"
        max={5}
        min={0}
        showLabels
        title="Product Rating"
        {...props}
    />
  </div>
)

export default GaugeMinMax
