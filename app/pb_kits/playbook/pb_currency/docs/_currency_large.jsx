import React from 'react'
import { Currency } from '../../'

const CurrencyLarge = () => {
  return (
    <>
      <Currency
          amount="2,000.50"
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
    </>
  )
}

export default CurrencyLarge
