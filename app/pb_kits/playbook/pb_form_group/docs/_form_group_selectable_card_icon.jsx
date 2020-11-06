import React, { useState } from 'react'
import { FormGroup, SelectableCardIcon } from '../../'

const FormGroupSelectableCardIcon = () => {
  const [selectedFormat, toggleFormat] = useState(null)

  return (
    <div>
      <FormGroup>
        <SelectableCardIcon
            checked={selectedFormat === 'basketball'}
            icon="basketball-ball"
            inputId={7}
            name="select"
            onChange={() => toggleFormat('basketball')}
            titleText="Basketball"
            value="basketball"
        />
        <SelectableCardIcon
            checked={selectedFormat === 'football'}
            icon="football-ball"
            inputId={8}
            name="select"
            onChange={() => toggleFormat('football')}
            titleText="Football"
            value="football"
        />
      </FormGroup>
    </div>
  )
}

export default FormGroupSelectableCardIcon
