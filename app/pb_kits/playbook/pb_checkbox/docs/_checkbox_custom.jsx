import React from 'react'
import { Checkbox } from '../../'

const CheckboxCustom = () => {
  return (
    <div>
      <Checkbox text="Custom Checkbox">
        <input
            name="custom-name"
            type="checkbox"
            value="custom-value"
        />
      </Checkbox>
    </div>
  )
}

export default CheckboxCustom
