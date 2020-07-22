import React from 'react'
import { Legend } from '../../'

const products = ['Windows', 'Doors', 'Roofing', 'Siding', 'Solar Gutters', 'Insulation', 'Other']

const LegendDefault = () => (
  <div>
    {
      products.map((product, i) => (
        <Legend
            aria={{ 'piratesOf': 'theCaribbean' }}
            color={`data_${i + 1}`}
            data={{ 'golden': 'apple' }}
            id="uniqueNewYork"
            key={`legend_${i + 1}`}
            text={product}
        />
      ))
    }
  </div>
)

export default LegendDefault
