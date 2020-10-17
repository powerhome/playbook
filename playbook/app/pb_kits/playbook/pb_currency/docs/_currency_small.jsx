import React from 'react'
import { Currency } from '../../'

const CurrencySmall = (props) => {
  return (
    <>
      <Currency
          {...props}
          amount="2,000.50"
          label="Caption"
          size="sm"
      />
      <Currency
          {...props}
          align="center"
          amount="342"
          label="Caption"
          size="sm"
          symbol="€"
      />
      <Currency
          {...props}
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
