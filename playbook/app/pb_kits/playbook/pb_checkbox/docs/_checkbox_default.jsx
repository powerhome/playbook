import React from 'react'

import Checkbox from '../_checkbox'

const CheckboxDefault = (props) => {
  return (
    <div>
      <Checkbox
          name="default name"
          tabIndex={0}
          text="Checkbox label"
          value="default value"
          {...props}
      />
    </div>
  )
}

export default CheckboxDefault
