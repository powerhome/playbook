import React, { useState } from 'react'
import { FormGroup, SelectableCardIcon } from '../../'

const FormGroupSelectableCardIcon = (props) => {
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
            {...props}
        />
        <SelectableCardIcon
            checked={selectedFormat === 'football'}
            icon="football-ball"
            inputId={8}
            name="select"
            onChange={() => toggleFormat('football')}
            titleText="Football"
            value="football"
            {...props}
        />
      </FormGroup>
    </div>
  )
}

export default FormGroupSelectableCardIcon
