import React from 'react'
import { Currency } from '../../'

const CurrencyDefault = () => {
  return (
    <div>
      <Currency
          amount="2,000.50"
          label="Caption"
      />
      <Currency
          align="center"
          amount="2,000"
          label="Caption"
      />
      <Currency
          align="right"
          amount="2,000"
          label="Caption"
      />
    </div>
  )
}

export default CurrencyDefault
