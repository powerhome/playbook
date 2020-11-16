import React, { useState } from 'react'
import { FormGroup, SelectableCard } from '../../'

const FormGroupSelectableCard = (props) => {
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
            {...props}
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
            {...props}
        >
          {'Dog'}
        </SelectableCard>
      </FormGroup>
    </div>
  )
}

export default FormGroupSelectableCard
