import React from 'react'
import { Select } from '../../'

const SelectDisabledOptions = () => {
  const options = [
    {
      value: '1',
      disabled: true,
      text: 'Espresso',
    },
    {
      value: '2',
      text: 'Americano',
    },
    {
      value: '3',
      disabled: true,
      text: 'Cappuccino',
    },
    {
      value: '4',
      text: 'Mocha',
    },
    {
      value: '5',
      text: 'Flat White',
    },
    {
      value: '6',
      text: 'Latte',
    },
  ]

  return (
    <div>
      <Select
          label="Favorite Coffee"
          name="coffee"
          options={options}
          value="2"
      />
    </div>
  )
}

export default SelectDisabledOptions
