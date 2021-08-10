import React from 'react'

import Currency from '../_currency'

const CurrencySize = (props) => {
  return (
    <>
      <Currency
          amount="2,000.50"
          label="Small"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount="342"
          label="Medium"
          marginBottom="md"
          size="md"
          symbol="€"
          {...props}
      />
      <Currency
          amount="45"
          label="Large"
          size="lg"
          unit="/mo"
          {...props}
      />
    </>
  )
}

export default CurrencySize
