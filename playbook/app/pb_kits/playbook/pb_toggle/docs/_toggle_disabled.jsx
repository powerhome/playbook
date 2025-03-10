import React from 'react'
import Toggle from '../../pb_toggle/_toggle'

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
