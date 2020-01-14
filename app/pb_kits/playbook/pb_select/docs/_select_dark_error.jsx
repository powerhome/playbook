import React from 'react'
import { Body, Select } from '../..'

const SelectDarkError = () => {
  return (
    <div>
      <Select
          dark
          error="Please make a valid selection"
          label="Favorite Food"
          name="food"
          options={[
          {
            value: '1',
            valueText: 'Burgers',
          },
          {
            value: '2',
            selected: true,
            valueText: 'Pizza',
          },
          {
            value: '3',
            valueText: 'Tacos',
          },
        ]}
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
