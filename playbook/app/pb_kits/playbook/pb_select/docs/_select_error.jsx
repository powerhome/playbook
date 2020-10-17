import React from 'react'
import { Body, Select } from '../..'

const SelectError = () => {
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
      />
      <Body
          error="Please make a valid selection"
          status="negative"
      />
    </div>
  )
}

export default SelectError
