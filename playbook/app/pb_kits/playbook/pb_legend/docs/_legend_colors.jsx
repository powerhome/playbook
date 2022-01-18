import React from 'react'
import { Legend } from '../..'

const LegendColors = (props) => (
  <div>
    <Legend
        color="data_8"
        text="Windows"
        {...props}
    />
    <Legend
        color="warning"
        text="Windows"
        {...props}
    />
    <Legend
        color="windows"
        text="Windows"
        {...props}
    />
    <Legend
        color="category_7"
        text="Windows"
        {...props}
    />
  </div>
)

export default LegendColors
