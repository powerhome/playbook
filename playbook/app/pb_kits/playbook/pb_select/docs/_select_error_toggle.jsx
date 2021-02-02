import React from 'react'
import { useState } from 'react'
import { Select, Button } from '../..'

const SelectErrorToggle = (props) => {
  const [ show, setShow ] = useState(false)
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
          error={show ? 'Error' : null}
          label="Favorite Food"
          name="food"
          options={options}
          value="2"
          {...props}
      />
      <Button onClick={() => setShow(!show)}>
        {'Toggle error'}
      </Button>
    </div>
  )
}

export default SelectErrorToggle
