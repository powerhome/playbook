import React from 'react'
import { Currency } from '../../'

const CurrencyDark = () => {
  return (
    <>
      <Currency
          amount="2,000.50"
          dark
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
    </>
  )
}

export default CurrencyDark
