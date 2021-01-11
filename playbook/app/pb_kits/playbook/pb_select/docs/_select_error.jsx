import React from 'react'
import { Body, Select } from '../..'

const SelectError = (props) => {
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
          error="Please make a valid selection"
          label="Favorite Food"
          name="food"
          options={options}
          value="2"
          {...props}
      />
      <Body
          error="Please make a valid selection"
          status="negative"
          {...props}
      />
    </div>
  )
}

export default SelectError
