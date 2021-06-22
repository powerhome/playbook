import React from 'react'

import Currency from '../_currency'

const CurrencyNoSymbol = (props) => {
  return (
    <Currency
        amount="309"
        label="Sales"
        size="md"
        symbol=""
        unit="/week"
        {...props}
    />
  )
}

export default CurrencyNoSymbol
