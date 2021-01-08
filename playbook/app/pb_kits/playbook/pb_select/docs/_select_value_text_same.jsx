import React from 'react'
import { Select } from '../../'

const SelectValueTextSame = (props) => {
  const options = [
    { value: 'Football' },
    { value: 'Baseball' },
    { value: 'Basketball' },
    { value: 'Hockey' },
  ]

  return (
    <div>
      <Select
          label="Favorite Sport"
          name="sports"
          options={options}
          {...props}
      />
    </div>
  )
}

export default SelectValueTextSame
