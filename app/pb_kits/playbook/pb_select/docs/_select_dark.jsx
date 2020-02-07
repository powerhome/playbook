import React from 'react'
import { Select } from '../../'

const SelectDark = () => {
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
          label="Favorite Food"
          name="food"
          options={options}
          value="2"
      />
    </div>
  )
}

export default SelectDark
