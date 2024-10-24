import React from "react"

import Currency from "../_currency"

const CurrencyCommaSeparator = (props) => {
  return (
    <Currency
        amount='1234567.89'
        commaSeparator
        decimals="matching"
        emphasized={false}
        size="lg"
        {...props}
    />
  )
}

export default CurrencyCommaSeparator
