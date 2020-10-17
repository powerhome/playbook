import React from 'react'
import { Select } from '../../'

const SelectValueTextSame = () => {
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
      />
    </div>
  )
}

export default SelectValueTextSame
