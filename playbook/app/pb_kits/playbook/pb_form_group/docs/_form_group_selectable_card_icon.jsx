import React, { useState } from 'react'

import FormGroup from '../_form_group'
import SelectableCardIcon from '../../pb_selectable_card_icon/_selectable_card_icon'

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
