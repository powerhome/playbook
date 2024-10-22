import React from 'react'

import Currency from '../_currency'

const CurrencyMatchingDecimals = (props) => {
  return (
    <>
      <Currency
          amount="372.12"
          label="Small"
          marginBottom="md"
          size="sm"
          unit="/day"
          {...props}
      />
      <Currency
          amount="30,327.43"
          label="Medium"
          marginBottom="md"
          size="md"
          symbol="€"
          {...props}
      />
      <Currency
          amount="621,953.99"
          label="Large"
          size="lg"
          {...props}
      />
    </>
  )
}

export default CurrencyMatchingDecimals

