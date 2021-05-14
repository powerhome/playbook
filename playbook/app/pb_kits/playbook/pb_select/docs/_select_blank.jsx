import React from 'react'

import Select from '../_select'

const SelectBlank = (props) => {
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
          {...props}
      />
    </div>
  )
}

export default SelectBlank
