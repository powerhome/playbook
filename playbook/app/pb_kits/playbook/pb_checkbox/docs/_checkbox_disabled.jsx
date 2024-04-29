import React from 'react'

import Checkbox from '../_checkbox'

const CheckboxDisabled = (props) => {
  return (
    <div>
      <Checkbox
          disabled
          name="default name"
          tabIndex={0}
          text="Disabled unchecked"
          value="default value"
          {...props}
      />
      <br />
      <Checkbox
          checked
          disabled
          name="checkbox-name"
          text="Disabled checked"
          value="check-box value"
          {...props}
      />
    </div>
  )
}

export default CheckboxDisabled
