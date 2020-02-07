import React from 'react'
import { Select } from '../../'

const SelectDisabledOptions = () => {
  const options = [
    {
      value: '1',
      disabled: true,
      valueText: 'Espresso',
    },
    {
      value: '2',
      valueText: 'Americano',
    },
    {
      value: '3',
      disabled: true,
      valueText: 'Cappuccino',
    },
    {
      value: '4',
      valueText: 'Mocha',
    },
    {
      value: '5',
      valueText: 'Flat White',
    },
    {
      value: '6',
      valueText: 'Latte',
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
