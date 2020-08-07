// @flow

import React, { useState } from 'react'
import { Toggle } from '../..'

const ToggleSize = () => {
  const [choice, setChoice] = useState(false)

  const handleOnChange = ({ target }) => {
    setChoice(target.value = !choice)
  }

  return (
    <>
      <Toggle
          checked={choice}
          size="sm"
      >
        <input
            name="toggleSmall"
            onChange={handleOnChange}
            type="checkbox"
            value="toggleSmall"
        />
      </Toggle>

      <br />

      <Toggle
          checked={choice}
          size="md"
      >
        <input
            name="toggleMedium"
            onChange={handleOnChange}
            type="checkbox"
            value="toggleMedium"
        />
      </Toggle>
    </>
  )
}

export default ToggleSize
