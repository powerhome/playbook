import React from 'react'
import { Currency, Title } from 'playbook-ui'

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
