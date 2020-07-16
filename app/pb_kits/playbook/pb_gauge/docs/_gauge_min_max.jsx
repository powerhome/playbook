import React from 'react'
import { Gauge, Title } from '../../'

const data = [{
  name: 'Rating', value: 4.5,
}]

const GaugeMinMax = () => (
  <div>
    <Title
        size={3}
        tag="h3"
        text="Min defaults to 0, Max to 100."
    />
    <Gauge
        chartData={data}
        id="gauge-min-max"
        max={5}
        min={0}
        showLabels
        title="Product Rating"
    />
  </div>
)

export default GaugeMinMax
