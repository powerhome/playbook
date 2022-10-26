import React from 'react'
import { Legend } from '../..'

const LegendCustomColors = (props) => (
  <div>
    <Legend
        color="#dc418a"
        text="Windows"
        {...props}
    />
    <Legend
        color="#3ef0b8"
        text="Windows"
        {...props}
    />
    <Legend
        color="#ab8b04"
        text="Windows"
        {...props}
    />
  </div>
)

export default LegendCustomColors