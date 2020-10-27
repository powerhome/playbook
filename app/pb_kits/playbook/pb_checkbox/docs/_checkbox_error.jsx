import React from 'react'
import { Checkbox } from '../..'

const CheckboxError = (props) => {
  return (
    <div>
      <Checkbox
          {...props}
          error
          errorMessage="Please check box"
          name="default name"
          text="Checkbox label"
          value="default value"
      />
    </div>
  )
}

export default CheckboxError
