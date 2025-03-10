import React from 'react'

import Currency from '../../pb_currency/_currency'
import Title from '../../pb_title/_title'

const CurrencyUnstyled = (props) => {
  return (
    <>
      <Currency
          amount="2,000.50"
          label="Basic unstyled example"
          marginBottom="md"
          unstyled
          {...props}
      />

      <Title
          size={1}
          {...props}
      >
        <Currency
            amount="2,000.50"
            label="Example with wrapping typography kit"
            unstyled
            {...props}
        />
      </Title>
    </>
  )
}

export default CurrencyUnstyled
