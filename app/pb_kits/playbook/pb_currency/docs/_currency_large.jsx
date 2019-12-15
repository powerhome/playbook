import React from 'react'
import { Currency } from '../../'

const CurrencyDefault = () => {
  return (
    <div>
      <Currency
          label="Caption"
          size="lg"
          value="2,000"
      />
      <Currency
          align="center"
          label="Caption"
          size="lg"
          value="2,000"
      />
      <Currency
          align="right"
          label="Caption"
          size="lg"
          value="2,000"
      />
    </div>
  )
}

export default CurrencyDefault
