import React from 'react'
import Checkbox from '../_checkbox'

const CheckboxRequiredIndicator = () => {
  return (
    <div>
      <Checkbox
          name="checkbox-name"
          requiredIndicator
          text="Checkbox label"
          value="check-box value"
      />
    </div>
  )
}

export default CheckboxRequiredIndicator
