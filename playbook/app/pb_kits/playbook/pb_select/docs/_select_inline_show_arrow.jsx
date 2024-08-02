import React from 'react'
import { Body, Select } from 'playbook-ui'

const SelectInlineShowArrow = (props) => {
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
  ]

  return (
    <div>
      <Select
          inline
          label="Favorite Food"
          name="food"
          options={options}
          showArrow
          {...props}
      />
      <Body
          status="negative"
          {...props}
      />
    </div>
  )
}

export default SelectInlineShowArrow
