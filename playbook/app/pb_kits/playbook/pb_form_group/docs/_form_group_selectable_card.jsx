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
            checked={value === 'cat'}
            inputId="cat1"
            multi={false}
            name="animal"
            onChange={handleSelect}
            value="cat"
        >
          {'Cat'}
        </SelectableCard>

        <SelectableCard
            checked={value === 'dog'}
            inputId="dog1"
            multi={false}
            name="animal"
            onChange={handleSelect}
            value="dog"
        >
          {'Dog'}
        </SelectableCard>
      </FormGroup>
    </div>
  )
}

export default FormGroupSelectableCard
