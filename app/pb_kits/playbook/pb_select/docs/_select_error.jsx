import React from 'react'
import { Body, Select } from '../..'

const SelectError = () => {
  return (
    <div>
      <Select
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
          error="Please make a valid selection"
          status="negative"
      />
    </div>
  )
}

export default SelectError
