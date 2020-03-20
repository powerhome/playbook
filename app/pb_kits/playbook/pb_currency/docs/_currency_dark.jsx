import React from 'react'
import { Currency } from '../../'

const CurrencyDark = () => {
  return (
    <div>
      <Currency
          amount="2,000.50"
          dark
          label="Caption"
          size="lg"
      />
      <Currency
          align="center"
          amount="342"
          dark
          label="Caption"
          size="md"
          symbol="€"
      />
      <Currency
          align="right"
          amount="45"
          dark
          label="Caption"
          size="sm"
          unit="/mo"
      />
    </div>
  )
}

export default CurrencyDark
