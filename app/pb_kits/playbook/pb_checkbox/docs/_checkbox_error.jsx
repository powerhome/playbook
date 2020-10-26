import React from 'react'
import { Checkbox } from '../..'

const CheckboxError = (props) => {
  return (
    <div>
      <Checkbox
          {...props}
          error
          errorMessage="Error, must checkbox"
          name="default name"
          text="Checkbox label"
          value="default value"
      />
    </div>
  )
}

export default CheckboxError
