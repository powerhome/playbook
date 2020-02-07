import React from 'react'
import { Select } from '../../'

const SelectDefault = () => {
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
          label="Favorite Food"
          name="food"
          options={options}
      />
    </div>
  )
}

export default SelectDefault
