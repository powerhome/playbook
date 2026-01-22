import React from 'react'

import Checkbox from '../_checkbox'

const CheckboxRequiredIndicator = (props) => {
  return (
    <div>
      <Checkbox
          name="checkbox-name"
          requiredIndicator
          text="Checkbox label"
          value="check-box value"
          {...props}
      />
    </div>
  )
}

export default CheckboxRequiredIndicator
