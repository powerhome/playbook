import React from 'react'
import Currency from "../../pb_currency/_currency"

const CurrencyNullDisplay = (props) => {
  return (
    <>
      <Currency
          amount=""
          label="Null"
          marginBottom="md"
          nullDisplay="--"
          {...props}
      />

      <Currency
          amount=""
          label="Null"
          marginBottom="md"
          nullDisplay="$0.00"
          {...props}
      />
    
      <Currency
          amount=""
          label="Null"
          marginBottom="md"
          nullDisplay=" "
          {...props}
      />
    </>
  )
}

export default CurrencyNullDisplay
