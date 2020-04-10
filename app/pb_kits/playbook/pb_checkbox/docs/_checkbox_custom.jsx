import React, { useState } from 'react'
import { Checkbox } from '../../'

const CheckboxCustom = () => {
  const [checked, setChecked] = useState(false)

  const handleOnChange = () => {
    setChecked(!checked)
  }

  return (
    <div>
      {`The checkbox is ${checked ? 'checked' : 'unchecked'}.`}
      <br />
      <br />
      <div>
        <Checkbox text="Toggle Me">
          <input
              checked={checked}
              name="custom-name"
              onChange={handleOnChange}
              type="checkbox"
              value="custom-value"
          />
        </Checkbox>
      </div>
    </div>
  )
}

export default CheckboxCustom
