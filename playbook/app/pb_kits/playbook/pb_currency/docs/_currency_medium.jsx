import React from 'react'
import { Currency } from '../../'

const CurrencyMedium = (props) => {
  return (
    <>
      <Currency
          {...props}
          amount="2,000.50"
          label="Caption"
          size="md"
      />
      <Currency
          {...props}
          align="center"
          amount="342"
          label="Caption"
          size="md"
          symbol="€"
      />
      <Currency
          {...props}
          align="right"
          amount="45"
          label="Caption"
          size="md"
          unit="/mo"
      />
    </>
  )
}

export default CurrencyMedium
