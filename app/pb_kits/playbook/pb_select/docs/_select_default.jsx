import React from 'react'
import { Select } from '../../'

const SelectDefault = () => {
  return (
    <div>
      <Select
          label='Favorite Food'
          name='food'
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
    </div>
  )
}

export default SelectDefault
