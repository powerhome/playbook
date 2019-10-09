import React from "react"
import {Currency} from "../../"

function CurrencyDefault() {
  return (
    <div>
      <Currency
          label='Left'
          value='2,000'
      />
      <Currency
          align='center'
          label='Center'
          value='2,000'
      />
      <Currency
          align='right'
          label='Right'
          value='2,000'
      />
    </div>
  )
}

export default CurrencyDefault;
