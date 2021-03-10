import React from 'react'
import { Checkbox } from '../..'

const CheckboxIndeterminate = (props) => {
  return (
    <Checkbox
        indeterminate
        name="checkbox-name"
        text="Indeterminate State"
        value="check-box value"
        {...props}
    />
  )
}

export default CheckboxIndeterminate
