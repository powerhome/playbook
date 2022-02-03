import React from 'react'

import Currency from '../_currency'

const CurrencyAbbreviated = (props) => {
  return (
    <>
      <Currency
          abbreviate
          amount="2,500"
          label="Thousands (with Unit)"
          marginBottom="md"
          size="md"
          unit="/mo"
          {...props}
      />
      <Currency
          abbreviate
          amount="45300000"
          label="Millions"
          marginBottom="md"
          size="md"
          {...props}
      />
      <Currency
          abbreviate
          amount="6,700,000,000"
          label="Billions"
          marginBottom="md"
          size="md"
          {...props}
      />
      <Currency
          abbreviate
          amount="9,900,000,000,000"
          label="Trillions"
          size="md"
          {...props}
      />
    </>
  )
}

export default CurrencyAbbreviated
