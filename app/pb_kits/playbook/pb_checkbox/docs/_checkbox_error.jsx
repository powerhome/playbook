import React from 'react'
import { Checkbox } from '../..'

const CheckboxError = () => {
  return (
    <div>
      <Checkbox
          error
          name="default name"
          text="Checkbox label"
          value="default value"
      />
    </div>
  )
}

export default CheckboxError
