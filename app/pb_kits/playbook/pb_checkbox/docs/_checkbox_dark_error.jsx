import React from 'react'
import { Checkbox } from '../..'

const CheckboxDarkError = () => {
  return (
    <div>
      <Checkbox
          dark
          error
          name="default name"
          text="Checkbox label"
          value="default value"
      />
    </div>
  )
}

export default CheckboxDarkError
