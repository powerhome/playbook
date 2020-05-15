import React, { useState } from 'react'
import { SelectableIcon } from '../../'

const SelectableIconDefault = () => {
  const [ checkSelected, toggleSelected ] = useState(true)
  const [ checkUnselected, toggleUnselected ] = useState(false)
  const [ checkDisabled, toggleDisabled ] = useState(false)

  return (

    <div className="pb--doc-demo-row">
      <SelectableIcon
          checked={checkSelected}
          icon="cog"
          inputId={10}
          onChange={() => toggleSelected(!checkSelected)}
          text="Selected"
      />

      <SelectableIcon
          checked={checkUnselected}
          icon="calendar"
          inputId={11}
          onChange={() => toggleUnselected(!checkUnselected)}
          text="Unselected"
      />

      <SelectableIcon
          checked={checkDisabled}
          disabled
          icon="inbox"
          inputId={12}
          onChange={() => toggleDisabled(!checkDisabled)}
          text="Disabled"
      />
    </div>
  )
}

export default SelectableIconDefault
