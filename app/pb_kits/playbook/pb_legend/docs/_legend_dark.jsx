import React from 'react'
import { Legend } from '../../'

const products = ['Windows', 'Doors', 'Roofing', 'Siding', 'Solar Gutters', 'Insulation', 'Other']

const LegendDark = () => (
  <div>
    {
      products.map((product, i) => (
        <Legend
            color={`data_${i + 1}`}
            dark
            key={`legend_${i + 1}`}
            text={product}
        />
      ))
    }
  </div>
)

export default LegendDark
