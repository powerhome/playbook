// @flow

import React, { useState } from 'react'
import { Toggle } from '../..'

const ToggleSize = () => {
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)

  return (
    <>
      <Toggle
          checked={toggle1}
          name="toggle1"
          onChange={(event) => setToggle1(event.target.value)}
          onCheck={(event) => alert(`${event.target.name} checked!`)}
          onUncheck={(event) => alert(`${event.target.name} unchecked!`)}
          size="sm"
      />

      <br />

      <Toggle
          checked={toggle2}
          name="toggle2"
          onChange={(event) => setToggle2(event.target.value)}
          onCheck={(event) => alert(`${event.target.name} checked!`)}
          onUncheck={(event) => alert(`${event.target.name} unchecked!`)}
          size="md"
      />
    </>
  )
}

export default ToggleSize
