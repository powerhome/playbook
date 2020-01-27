import React from 'react'
import { Currency } from '../../'

const CurrencyDefault = () => {
  return (
    <div>
      <Currency
          amount="2,000.50"
          label="Caption"
          size="lg"
      />
      <Currency
          align="center"
          amount="342"
          label="Caption"
          size="lg"
          symbol="€"
      />
      <Currency
          align="right"
          amount="45"
          label="Caption"
          size="lg"
          unit="/mo"
      />
    </div>
  )
}

export default CurrencyDefault
