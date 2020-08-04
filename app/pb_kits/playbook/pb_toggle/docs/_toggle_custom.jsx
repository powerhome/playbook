// @flow

import React, { useState } from 'react'
import { Toggle } from '../..'

const ToggleCustom = () => {
  const [choice, setChoice] = useState(false)

  const handleOnChange = ({ target }) => {
    setChoice(target.value)
  }

  return (
    <>
      <Toggle
          checked={choice === 'walk'}
          size="sm"
      >
        <input
            name="my custom checkbox"
            onChange={handleOnChange}
            type="radio"
            value="ABC"
        />
      </Toggle>
    </>
  )
}

export default ToggleCustom