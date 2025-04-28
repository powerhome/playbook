import React from 'react'
import Body from '../../pb_body/_body'
import Select from '../../pb_select/_select'
import Icon from '../../pb_icon/_icon'

const SelectError = (props) => {
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

  const error = (<>
    <Icon icon="warning" /> Please make a valid selection
  </>)

  return (
    <div>
      <Select
          error={error}
          label="Favorite Food"
          name="food"
          options={options}
          value="2"
          {...props}
      />
      <Body
          error={error}
          status="negative"
          {...props}
      />
    </div>
  )
}

export default SelectError
