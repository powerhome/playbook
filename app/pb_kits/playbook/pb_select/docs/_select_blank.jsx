import React from 'react'
import { Select } from '../../'

function SelectBlank() {
  return (
    <div>
      <Select
          blankSelection='Select One...'
          label='Where do you live'
          name='location'
          options={[
          {
            value: 'USA',
          },
          {
            value: 'Canada',
          },
          {
            value: 'Brazil',
          },
          {
            value: 'Philippines',
          },
        ]}
      />
    </div>
  )
}

export default SelectBlank
