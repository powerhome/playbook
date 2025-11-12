import React from 'react'

import Currency from '../_currency'

const CurrencyNegative = (props) => {
  return (
    <>
      <Currency
          amount="-2,000.50"
          {...props}
      />
      <Currency
          amount="-2,000.50"
          size="md"
          {...props}
      />
      <Currency
          amount="-2,000.50"
          size="lg"
          {...props}
      />
    </>
  )
}

export default CurrencyNegative
