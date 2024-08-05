import React from 'react'
import { Toggle } from 'playbook-ui'

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
