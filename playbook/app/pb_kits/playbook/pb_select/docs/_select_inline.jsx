import React from 'react'
import Body from '../../pb_body/_body'
import Select from '../../pb_select/_select'

const SelectInline = (props) => {
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
          {...props}
      />
      <Body
          status="negative"
          {...props}
      />
    </div>
  )
}

export default SelectInline
