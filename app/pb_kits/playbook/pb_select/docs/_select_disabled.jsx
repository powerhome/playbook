import React from 'react'
import {Select} from '../../'

function SelectDisabled() {
  return (
    <div>
      <Select
        label='Favorite Dessert'
        disabled
        name='dessert'
        options={[
          {
            value: 'Apple Pie',
          },
          {
            value: 'Cookies',
          },
          {
            value: 'Ice Cream',
          },
          {
            value: 'Brownies',
          },
        ]}
      />
    </div>
  )
}

export default SelectDisabled
