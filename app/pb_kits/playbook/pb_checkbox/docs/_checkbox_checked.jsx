import React from 'react'
import { Checkbox } from '../../'

const CheckboxChecked = (props) => {
  return (
    <div>
      <Checkbox
          {...props}
          checked
          name="checkbox-name"
          text="Checked Checkbox"
          value="check-box value"
      />
    </div>
  )
}

export default CheckboxChecked
