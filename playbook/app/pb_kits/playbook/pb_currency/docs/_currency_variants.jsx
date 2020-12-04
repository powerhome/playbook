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
          marginBottom="md"
          size="sm"
      />
      <Currency
          {...props}
          amount="342"
          label="Light"
          marginBottom="md"
          size="sm"
          symbol="€"
          variant="light"
      />
      <Currency
          {...props}
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
