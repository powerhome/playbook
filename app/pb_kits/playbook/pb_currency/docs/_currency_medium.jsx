import React from 'react'
import { Currency } from '../../'

const CurrencyMedium = () => {
  return (
    <div>
      <Currency
          amount="2,000.50"
          label="Caption"
          size="md"
      />
      <Currency
          align="center"
          amount="342"
          label="Caption"
          size="md"
          symbol="€"
      />
      <Currency
          align="right"
          amount="45"
          label="Caption"
          size="md"
          unit="/mo"
      />
    </div>
  )
}

export default CurrencyMedium
