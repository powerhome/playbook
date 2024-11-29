import React from 'react'

import Currency from '../_currency'

const CurrencyNegative = (props) => {
  return (
    <>
      <Currency
          amount="-2,000.50"
          {...props}
      />
    </>
  )
}

export default CurrencyNegative
