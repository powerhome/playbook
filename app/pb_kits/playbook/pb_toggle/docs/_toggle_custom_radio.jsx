// @flow

import React, { useState } from 'react'
import { Caption, Title, Toggle } from '../..'

const ToggleCustomRadio = () => {
  const [choice, setChoice] = useState('walk')

  const handleOnChange = ({ target }) => {
    setChoice(target.value)
  }

  return (
    <>
      <Title
          size={4}
          text="Select one option:"
      />

      <br />

      <Caption
          text="Walk"
      />
      <Toggle
          checked={choice}
          size="sm"
      >
        <input
            name="modes of transportation"
            onChange={handleOnChange}
            type="radio"
            value="walk"
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
            name="modes of transportation"
            onChange={handleOnChange}
            type="radio"
            value="bike"
        />
      </Toggle>

      <br />

      <Caption
          text="Ride"
      />
      <Toggle
          size="sm"
      >
        <input
            name="modes of transportation"
            onChange={handleOnChange}
            type="radio"
            value="ride"
        />
      </Toggle>
    </>
  )
}

export default ToggleCustomRadio
