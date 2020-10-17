import React from 'react'
import { Select } from '../../'

const SelectDisabled = () => {
  const options = [
    { value: 'Apple Pie' },
    { value: 'Cookies' },
    { value: 'Ice Cream' },
    { value: 'Brownies' },
  ]

  return (
    <div>
      <Select
          disabled
          label="Favorite Dessert"
          name="dessert"
          options={options}
      />
    </div>
  )
}

export default SelectDisabled
