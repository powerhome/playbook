import React from 'react'
import { Select } from '../../'

const SelectRequired = () => {
  return (
    <div>
      <Select
          blankSelection="Select One..."
          label="Which shoe do you tie first?"
          name="shoe"
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
          required
      />
    </div>
  )
}

export default SelectRequired
