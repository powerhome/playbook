import React from 'react'
import { Select } from '../../'

const SelectBlank = () => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
  ]

  return (
    <div>
      <Select
          blankSelection="Select One..."
          label="Where do you live"
          name="location"
          options={options}
      />
    </div>
  )
}

export default SelectBlank
