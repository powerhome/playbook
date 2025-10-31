import React from 'react'

import Currency from '../_currency'

const CurrencyVariants = (props) => {
  return (
    <>
      <Currency
          amount="2,000.50"
          emphasized={false}
          label="Emphasized False"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount={342}
          label="Light"
          marginBottom="md"
          size="sm"
          symbol="€"
          variant="light"
          {...props}
      />
      <Currency
          amount="45"
          label="Bold"
          size="sm"
          unit="/mo"
          variant="bold"
          {...props}
      />
    </>
  )
}

export default CurrencyVariants
