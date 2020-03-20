import React from 'react'
import { Currency } from '../../'

const CurrencySmall = () => {
  return (
    <div>
      <Currency
          amount="2,000.50"
          label="Caption"
      />
      <Currency
          align="center"
          amount="342"
          label="Caption"
          symbol="€"
      />
      <Currency
          align="right"
          amount="45"
          label="Caption"
          unit="/mo"
      />
    </div>
  )
}

export default CurrencySmall
