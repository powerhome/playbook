import React from "react"
import {Currency} from "../../"

function CurrencyDefault() {
  return (
    <div>
      <Currency
          label='Left'
          size='lg'
          value='2,000'
      />
      <Currency
          align='center'
          label='Center'
          size='lg'
          value='2,000'
      />
      <Currency
          align='right'
          label='Right'
          size='lg'
          value='2,000'
      />
    </div>
  )
}

export default CurrencyDefault;
