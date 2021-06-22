import React from 'react'

import Checkbox from '../_checkbox'

const CheckboxChecked = (props) => {
  return (
    <div>
      <Checkbox
          checked
          name="checkbox-name"
          text="Checked Checkbox"
          value="check-box value"
          {...props}
      />
    </div>
  )
}

export default CheckboxChecked
