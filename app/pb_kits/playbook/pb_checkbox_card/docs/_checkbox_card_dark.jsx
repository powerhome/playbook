import React from 'react'
import { CheckboxCard } from '../../'

const CheckboxCardDark = () => (
  <div>
    <CheckboxCard
        checked
        dark
    />
    <CheckboxCard
        dark
        text="Unselected"
    />
    <CheckboxCard
        checked
        dark
        text="Selected"
    />
    <CheckboxCard
        dark
        error
        text="Error Checkbox"
    />
    <CheckboxCard
        dark
        highlight={{ position: 'side', color: 'doors' }}
        text="With Card Highlighting"
    />
  </div>

)

export default CheckboxCardDark
