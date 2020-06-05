import React from 'react'
import { Currency } from '../../'

const CurrencySmall = () => {
  return (
    <>
      <Currency
          amount="2,000.50"
          label="Caption"
          size="sm"
      />
      <Currency
          align="center"
          amount="342"
          label="Caption"
          size="sm"
          symbol="€"
      />
      <Currency
          align="right"
          amount="45"
          label="Caption"
          size="sm"
          unit="/mo"
      />
    </>
  )
}

export default CurrencySmall
