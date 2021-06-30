import React from 'react'

import Currency from '../_currency'

const CurrencyAlignment = (props) => {
  return (
    <>
      <Currency
          amount="2,000.50"
          label="Left"
          size="sm"
          {...props}
      />
      <Currency
          align="center"
          amount="342"
          label="Center"
          size="sm"
          symbol="€"
          {...props}
      />
      <Currency
          align="right"
          amount="45"
          label="Right"
          size="sm"
          unit="/mo"
          {...props}
      />
    </>
  )
}

export default CurrencyAlignment
