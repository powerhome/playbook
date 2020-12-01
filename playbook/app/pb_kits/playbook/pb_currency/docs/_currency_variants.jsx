import React from 'react'
import { Currency } from '../../'

const CurrencyVariants = (props) => {
  return (
    <>
      <Currency
          {...props}
          amount="2,000.50"
          emphasized={false}
          label="Emphasized False"
          size="sm"
      />
      <Currency
          {...props}
          align="center"
          amount="342"
          label="Light"
          size="sm"
          symbol="€"
          variant="light"
      />
      <Currency
          {...props}
          align="right"
          amount="45"
          label="Bold"
          size="sm"
          unit="/mo"
          variant="bold"
      />
    </>
  )
}

export default CurrencyVariants
