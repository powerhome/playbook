import React from 'react'
import Toggle from '../../pb_toggle/_toggle'

const ToggleDefault = () => {
  return (
    <>
      <Toggle
          checked
          tabIndex={0}
      />

      <br />

      <Toggle tabIndex={0} />
    </>
  )
}

export default ToggleDefault
