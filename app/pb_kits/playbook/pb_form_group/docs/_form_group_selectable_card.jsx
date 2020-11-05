import React, { useState } from 'react'
import { FormGroup, SelectableCard } from '../../'

const FormGroupSelectableCard = () => {
  const [value, setValue] = useState('')

  const handleSelect = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <FormGroup>
        <SelectableCard
            checked={value === 'male'}
            inputId="male1"
            multi={false}
            name="gender"
            onChange={handleSelect}
            value="male"
        >
          {'Male'}
        </SelectableCard>

        <SelectableCard
            checked={value === 'female'}
            inputId="female1"
            multi={false}
            name="gender"
            onChange={handleSelect}
            value="female"
        >
          {'Female'}
        </SelectableCard>
      </FormGroup>
    </div>
  )
}

export default FormGroupSelectableCard
