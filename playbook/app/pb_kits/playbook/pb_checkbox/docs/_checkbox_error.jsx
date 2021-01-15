import React from 'react'
import { Checkbox } from '../..'

const CheckboxError = (props) => {
  return (
    <div>
      <Checkbox
          error
          name="default name"
          text="Checkbox label"
          value="default value"
          {...props}
      />
    </div>
  )
}

export default CheckboxError
