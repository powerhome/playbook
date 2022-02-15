import React from 'react'

import Legend from '../_legend'

const products = ['Windows', 'Doors', 'Roofing', 'Siding', 'Solar', 'Gutters', 'Insulation', 'Other']

const LegendDefault = (props) => (
  <div>
    {
      products.map((product, i) => (
        <Legend
            color={`data_${i + 1}`}
            key={`legend_${i + 1}`}
            text={product}
            {...props}
        />
      ))
    }
  </div>
)

export default LegendDefault
