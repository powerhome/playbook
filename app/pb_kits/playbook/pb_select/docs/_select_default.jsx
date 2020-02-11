import React from 'react'
import { Select } from '../../'

const SelectDefault = () => {
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
          label="Favorite Food"
          name="food"
          options={options}
      />
    </div>
  )
}

export default SelectDefault
