import React from 'react'
import { Select } from '../../'

const SelectDark = () => {
  const options = [
    {
      value: '1',
      valueText: 'Burgers',
    },
    {
      value: '2',
      valueText: 'Pizza',
    },
    {
      value: '3',
      valueText: 'Tacos',
    },
  ]

  return (
    <div>
      <Select
          dark
          label="Favorite Food"
          name="food"
          options={options}
          value="2"
      />
    </div>
  )
}

export default SelectDark
