import React from 'react'
import { Body, Select } from '../..'

const SelectDarkError = () => {
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
          dark
          error="Please make a valid selection"
          label="Favorite Food"
          name="food"
          options={options}
          value="2"
      />
      <Body
          dark
          error="Please make a valid selection"
          status="negative"
      />
    </div>
  )
}

export default SelectDarkError
