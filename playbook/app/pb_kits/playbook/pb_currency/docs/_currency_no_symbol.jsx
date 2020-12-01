import React from 'react'
import { Currency } from '../../'

const CurrencyNoSymbol = (props) => {
  return (
    <Currency
        {...props}
        amount="19,950.00"
        label="Caption"
        size="md"
        symbol=""
    />
  )
}

export default CurrencyNoSymbol
