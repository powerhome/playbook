import React from 'react'
import {Select} from '../../'

function SelectBlank() {
  return (
    <div>
      <Select
        label='Where do you live'
        name='location'
        blankSelection='Select One...'
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
