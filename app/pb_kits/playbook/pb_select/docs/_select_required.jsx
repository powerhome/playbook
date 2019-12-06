import React from 'react'
import {Select} from '../../'

function SelectRequired() {
  return (
    <div>
      <Select
        label='Which shoe do you tie first?'
        required
        name='shoe'
        blankSelection='Select One...'
        options={[
          {
            value: 'Left',
          },
          {
            value: 'Right',
          },
          {
            value: 'I go without laces',
          },
        ]}
      />
    </div>
  )
}

export default SelectRequired
