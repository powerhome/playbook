import React from 'react'

import Select from '../_select'

const SelectMultiple = (props) => {
  const options = [
    {
      value: '1',
      text: 'Burgers',
    },
    {
      value: '2',
      text: 'Pizza',
    },
    {
      value: '3',
      text: 'Tacos',
    },
    {
      value: '4',
      text: 'BBQ',
    },
    {
      value: '5',
      text: 'Sushi',
    },
    {
      value: '6',
      text: 'Chinese',
    },
    {
      value: '7',
      text: 'Hot Dogs',
    },
  ]

  return (
    <div>
      <Select
          label="Favorite Food"
          multiple
          name="food-multiple"
          options={options}
          {...props}
      />
    </div>
  )
}

export default SelectMultiple