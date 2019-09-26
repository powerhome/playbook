import React from "react"
import {Currency} from "../../"

function CurrencyDefault() {
  return (
    <div>
      <Currency
          label='Caption'
          value='2,000'
      />
      <Currency
          align='center'
          label='Caption'
          value='2,000'
      />
      <Currency
          align='right'
          label='Caption'
          value='2,000'
      />
    </div>
  )
}

export default CurrencyDefault;
