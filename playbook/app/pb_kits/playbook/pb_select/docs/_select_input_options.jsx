import React from 'react'

import Select from '../_select'

const SelectInputOptions = (props) => {
  const options = [
    { value: 'pizza', text: 'Pizza' },
    { value: 'tacos', text: 'Tacos' },
    { value: 'sushi', text: 'Sushi' },
  ]

  return (
    <>
      <Select
          inputOptions={{
            'aria-label': 'Select your favorite food',
            className: 'custom-select-class',
            id: 'favorite-food-select',
          }}
          label="Favorite Food"
          name="favorite_food"
          options={options}
          {...props}
      />
    </>
  )
}

export default SelectInputOptions

