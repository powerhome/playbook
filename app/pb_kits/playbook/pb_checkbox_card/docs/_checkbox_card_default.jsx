import React, { useState } from 'react'
import { CheckboxCard } from '../../'

const CheckboxCardDefault = () => {
  const [checkedStates, setCheckedStates] = useState({
    default: false,
    startingChecked: true,
    textProp: false,
    textAndChildren: false,
    childrenText: false,
    disabled: false,
  })
  const checkboxChanged = (e) => {
    const target = e.target.id
    // console.log(e.target.id)
    // console.log(checkedStates)
    // console.log(checkedStates[target])
    setCheckedStates(Object.assign({}, checkedStates, { [target]: !checkedStates[target] }))
  }
  return (
    <div>
      <CheckboxCard
          checked={checkedStates.default}
          inputId="Different Name"
          name="default"
          onChange={checkboxChanged}
          text="default"
      />
      <CheckboxCard
          checked={checkedStates.startingChecked}
          name="startingChecked"
          onChange={checkboxChanged}
          text="Checked to start"
      />
      <CheckboxCard
          checked={checkedStates.textProp}
          name="textProp"
          onChange={checkboxChanged}
          text="This Text is in the text prop"
      />
      <CheckboxCard
          checked={checkedStates.textAndChildren}
          name="textAndChildren"
          onChange={checkboxChanged}
          text="This text is in the text prop"
      >
        {'This text is passed as a child'}
      </CheckboxCard>
      <CheckboxCard
          checked={checkedStates.childrenText}
          name="childrenText"
          onChange={checkboxChanged}
      >
        {'This text is passed as a child, and there is no text prop passed'}
      </CheckboxCard>
      <CheckboxCard
          checked={checkedStates.disabled}
          disabled
          name="disabled"
          onChange={checkboxChanged}
          text="Disabled"
      />
    </div>
  )
}

export default CheckboxCardDefault
