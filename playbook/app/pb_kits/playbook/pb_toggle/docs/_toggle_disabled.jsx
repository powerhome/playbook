// @flow

import React from 'react'
import { Toggle } from '../..'

const ToggleDisabled= () => {
  return (
    <>
      <Toggle
          checked
          disabled 
      />

      <br />

      <Toggle disabled />
    </>
  )
}

export default ToggleDisabled 
