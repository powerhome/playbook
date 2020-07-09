import React from 'react'
import { Gauge } from '../../'

const chartData = [{
  name: 'Rating', value: 8.5,
}]

const GaugeMinMax = () => (
  <div>
    <Gauge
        chartData={chartData}
        id="gauge-min-max"
        max={10}
        min={0}
        showLabels
        title="Product Rating"
    />
  </div>
)

export default GaugeMinMax
