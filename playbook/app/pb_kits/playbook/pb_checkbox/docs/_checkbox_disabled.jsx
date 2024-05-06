import React from 'react'

import Checkbox from '../_checkbox'

const CheckboxDisabled = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Checkbox
          disabled
          marginBottom="xs"
          name="default name"
          tabIndex={0}
          text="Disabled unchecked"
          value="default value"
          {...props}
      />
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
