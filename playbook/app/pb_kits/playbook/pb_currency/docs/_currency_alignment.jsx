import React from 'react'
import { Currency } from '../../'

const CurrencyAlignment = (props) => {
  return (
    <>
      <Currency
          {...props}
          amount="2,000.50"
          label="Left"
          size="sm"
      />
      <Currency
          {...props}
          align="center"
          amount="342"
          label="Center"
          size="sm"
          symbol="€"
      />
      <Currency
          {...props}
          align="right"
          amount="45"
          label="Right"
          size="sm"
          unit="/mo"
      />
    </>
  )
}

export default CurrencyAlignment
