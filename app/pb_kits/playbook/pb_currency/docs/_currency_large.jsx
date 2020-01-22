import React from 'react'
import { Currency } from '../../'

const CurrencyDefault = () => {
  return (
    <div>
      <Currency
          amount="2,000.50"
          size="lg"
      />
      <Currency
          align="center"
          amount="2,000.00"
          label="Caption"
          size="lg"
          symbol="$$$"
      />
      <Currency
          align="right"
          amount="2,000"
          label="Caption"
          size="lg"
      />
    </div>
  )
}

export default CurrencyDefault
