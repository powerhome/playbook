import React from 'react'
import { Currency } from '../../'

const CurrencyLarge = (props) => {
  return (
    <>
      <Currency
          {...props}
          amount="2,000.50"
          size="lg"
      />
      <Currency
          {...props}
          align="center"
          amount="342"
          label="Caption"
          size="lg"
          symbol="€"
      />
      <Currency
          {...props}
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
