import React from 'react'
import { Currency } from '../../'

const CurrencyNoSymbol = (props) => {
  return (
    <Currency
        {...props}
        amount="309"
        label="Sales"
        size="md"
        symbol=""
        unit="/week"
    />
  )
}

export default CurrencyNoSymbol
