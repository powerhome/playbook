import React from 'react'
import { Currency } from 'playbook-ui'

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
