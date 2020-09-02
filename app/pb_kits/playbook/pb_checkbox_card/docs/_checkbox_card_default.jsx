import React, { useState } from 'react'
import { CheckboxCard } from '../../'

const CheckboxCardDefault = () => {
  const [defaultIsChecked, setDefaultIsChecked] = useState(true)
  const checkboxChanged = () => {
    setDefaultIsChecked(!isChecked)
  }
  return (
    <div>
      <CheckboxCard
          checked={defaultIsChecked}
          onChange={checkboxChanged}
          text="default"
      />
      <CheckboxCard>{'TEXT IN CHILDREN'}</CheckboxCard>
      <CheckboxCard  text="Unselected" />
      <CheckboxCard
          checked
          text="Selected"
      />
      <CheckboxCard
          error
          text="Error Checkbox"
      />
      <CheckboxCard
          highlight={{ position: 'top', color: 'doors' }}
          text="With Card Highlighting"
      />
      <CheckboxCard
          disabled
          text="Disabled"
      />
    </div>
  )
}

export default CheckboxCardDefault
