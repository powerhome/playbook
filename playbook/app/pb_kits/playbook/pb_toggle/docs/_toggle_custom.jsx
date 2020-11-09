// @flow

import React, { useState } from 'react'
import { Toggle } from '../..'

const ToggleCustom = () => {
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
            className="my custom checkbox"
            name="custom checkbox"
            onChange={handleOnChange}
            type="checkbox"
            value="ABC"
        />
      </Toggle>
    </>
  )
}

export default ToggleCustom
