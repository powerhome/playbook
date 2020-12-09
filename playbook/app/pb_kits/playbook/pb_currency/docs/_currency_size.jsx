import React from 'react'
import { Currency } from '../../'

const CurrencySize = (props) => {
  return (
    <>
      <Currency
          {...props}
          amount="2,000.50"
          label="Small"
          marginBottom="md"
          size="sm"
      />
      <Currency
          {...props}
          amount="342"
          label="Medium"
          marginBottom="md"
          size="md"
          symbol="€"
      />
      <Currency
          {...props}
          amount="45"
          label="Large"
          size="lg"
          unit="/mo"
      />
    </>
  )
}

export default CurrencySize
