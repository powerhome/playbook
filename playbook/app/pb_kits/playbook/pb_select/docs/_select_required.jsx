import React from 'react'
import { Select } from '../../'

const SelectRequired = (props) => {
  const options = [
    { value: 'Left' },
    { value: 'Right' },
    { value: 'I go without laces' },
  ]

  return (
    <div>
      <Select
          blankSelection="Select One..."
          label="Which shoe do you tie first?"
          name="shoe"
          options={options}
          required
          {...props}
      />
    </div>
  )
}

export default SelectRequired
