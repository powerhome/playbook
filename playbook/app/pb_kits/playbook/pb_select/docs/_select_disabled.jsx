import React from 'react'

import Select from '../_select'

const SelectDisabled = (props) => {
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
          {...props}
      />
    </div>
  )
}

export default SelectDisabled
