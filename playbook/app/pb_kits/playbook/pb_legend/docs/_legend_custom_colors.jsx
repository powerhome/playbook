import React from 'react'
import { Legend } from 'playbook-ui'

const LegendCustomColors = (props) => (
  <div>
    <Legend
        color="#dc418a"
        text="Custom Legend Color 1"
        {...props}
    />
    <Legend
        color="#3ef0b8"
        text="Custom Legend Color 2"
        {...props}
    />
    <Legend
        color="#ab8b04"
        text="Custom Legend Color 3"
        {...props}
    />
  </div>
)

export default LegendCustomColors