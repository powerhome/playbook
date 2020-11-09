import React from 'react'
import { Checkbox } from '../../'

const CheckboxDefault = (props) => {
  return (
    <div>
      <Checkbox
          {...props}
          name="default name"
          text="Checkbox label"
          value="default value"
      />
    </div>
  )
}

export default CheckboxDefault
