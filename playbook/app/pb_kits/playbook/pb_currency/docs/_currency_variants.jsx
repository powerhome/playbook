import React from 'react'

import Currency from '../_currency'

const CurrencyVariants = (props) => {
  return (
    <>
      <Currency
          amount="0"
          label="Default"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount="0"
          emphasized={false}
          label="Emphasized False"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount={0}
          label="Light"
          marginBottom="md"
          size="sm"
          symbol="€"
          variant="light"
          {...props}
      />
      <Currency
          amount="0"
          label="Bold"
          marginBottom="md"
          size="sm"
          unit="/mo"
          variant="bold"
          {...props}
      />
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
      <Currency
          amount="-.53"
          label="Null"
          marginBottom="md"
          nullDisplay="$0.00"
          {...props}
      />
      <Currency
          amount="-.53"
          label="Null"
          marginBottom="md"
          nullDisplay="0"
          {...props}
      />
      <Currency
          amount=""
          label="Empty (no null display)"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount={0}
          label="Numeric 0 + nullDisplay (expect $0.00)"
          marginBottom="md"
          nullDisplay="--"
          size="sm"
          {...props}
      />
      <Currency
          amount="0.00"
          label="String 0.00"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount="-123.45"
          label="Negative + nullDisplay (expect -$123.45)"
          marginBottom="md"
          nullDisplay="$0.00"
          size="sm"
          {...props}
      />
      <Currency
          amount="-123.45"
          label="Negative sm"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount="-123.45"
          label="Negative md"
          marginBottom="md"
          size="md"
          {...props}
      />
      <Currency
          amount="320.20"
          decimals="matching"
          label="Decimals matching"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount="0.00"
          commaSeparator
          label="Comma separator + zero"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount="1234567.89"
          commaSeparator
          label="Comma separator"
          marginBottom="md"
          size="sm"
          {...props}
      />
      <Currency
          amount="0.00"
          label="Unstyled zero"
          marginBottom="md"
          size="sm"
          unstyled
          {...props}
      />
    </>
  )
}

export default CurrencyVariants
