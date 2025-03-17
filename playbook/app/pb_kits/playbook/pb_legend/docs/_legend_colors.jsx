import React from 'react'
import Legend from '../../pb_legend/_legend'

const LegendColors = (props) => (
  <div>
    <Legend
        color="data_8"
        text="Data 8"
        {...props}
    />
    <Legend
        color="warning"
        text="Warning"
        {...props}
    />
    <Legend
        color="product_6_highlight"
        text="Product 6 (highlight)"
        {...props}
    />
    <Legend
        color="category_7"
        text="Category 7"
        {...props}
    />
  </div>
)

export default LegendColors
