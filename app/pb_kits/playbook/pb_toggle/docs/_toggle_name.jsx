// @flow

import React, { useState } from 'react'
import { Caption, Title, Toggle } from '../..'

const ToggleName = () => {
  const [choice1, setChoice1] = useState(false)
  const [choice2, setChoice2] = useState(false)

  const handleOnChange = ({ target }) => {
    setChoice(target.value)
  }

  return (
    <>
      <Title
          size={4}
          text="Which of the following vehicles do you own?"
      />

      <br />

      <Caption
          text="Car"
      />
      <Toggle
          checked={choice}
          size="sm"
      >
        <input
            name="vehicle"
            onChange={handleOnChange}
            type="radio"
            value="car"
        />
      </Toggle>

      <br />

      <Caption
          text="Bike"
      />
      <Toggle
          size="sm"
      >
        <input
            clicked={choice}
            name="vehicle"
            onChange={handleOnChange}
            type="radio"
            value="bike"
        />
      </Toggle>
    </>
  )
}

export default ToggleName
