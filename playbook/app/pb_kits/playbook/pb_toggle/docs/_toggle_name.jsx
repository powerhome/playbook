// @flow

import React, { useState } from 'react'
import { Caption, Title, Toggle } from '../..'

const ToggleName = () => {
  const [choice, setChoice] = useState(false)

  const handleOnChange = ({ target }) => {
    setChoice(target.value = !choice)
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
            type="checkbox"
            value="car"
        />
      </Toggle>

      <br />
      <Caption
          text="Bike"
      />
      <Toggle
          checked={choice}
          size="sm"
      >
        <input
            name="vehicle"
            onChange={handleOnChange}
            type="checkbox"
            value="bike"
        />
      </Toggle>

    </>
  )
}

export default ToggleName
