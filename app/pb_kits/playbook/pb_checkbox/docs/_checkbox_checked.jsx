import React from 'react'
import { Checkbox } from '../../'

const CheckboxChecked = () => {
  return (
    <div>
      <Checkbox
          checked
          name="checkbox-name"
          text="Checked Checkbox"
          value="check-box value"
      />
    </div>
  )
}

export default CheckboxChecked
