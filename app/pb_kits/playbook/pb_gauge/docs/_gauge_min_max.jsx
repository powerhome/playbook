import React from 'react'
import { Gauge } from '../../'

const chartData = [{
  name: 'Rating', value: 4.5,
}]

const GaugeMinMax = () => (
  <div>
    <Gauge
        chartData={chartData}
        id="gauge-min-max"
        // max defaults to 100
        max={5}
        // min defaults to 0
        min={0}
        showLabels
        title="Product Rating"
    />
  </div>
)

export default GaugeMinMax
