import React from 'react'
import { Select } from '../../'

function SelectDisabledOptions() {
  return (
    <div>
      <Select
          label='Favorite Coffee'
          name='coffee'
          options={[
          {
            value: '1',
            disabled: true,
            valueText: 'Espresso',
          },
          {
            value: '2',
            selected: true,
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
        ]}
      />
    </div>
  )
}

export default SelectDisabledOptions
