import React from 'react'
import { Body, Select } from '../..'

const SelectInlineCompact = (props) => {
  const options = [
    {
      value: '1',
      text: 'Burgers',
    },
    {
      value: '2',
      text: 'Pizza',
    },
    {
      value: '3',
      text: 'Tacos',
    },
  ]

  return (
    <div>
      <Select
          compact
          inline
          label="Favorite Food"
          name="food"
          options={options}
          value="2"
          {...props}
      />
      <Body
          status="negative"
          {...props}
      />
    </div>
  )
}

export default SelectInlineCompact
