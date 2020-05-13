import React, { useState } from 'react'
import { SelectableIcon } from '../../'

const SelectableIconDark = () => {
  const [ checkSelected, toggleSelected ] = useState(true)
  const [ checkUnselected, toggleUnselected ] = useState(false)
  const [ checkDisabled, toggleDisabled ] = useState(false)

  return (

    <div className="pb--doc-demo-row">
      <SelectableIcon
          checked={checkSelected}
          dark
          icon="user"
          inputId={16}
          onChange={() => toggleSelected(!checkSelected)}
          text="Selected"
      />

      <SelectableIcon
          checked={checkUnselected}
          dark
          icon="calendar"
          inputId={17}
          onChange={() => toggleUnselected(!checkUnselected)}
          text="Unselected"
      />

      <SelectableIcon
          checked={checkDisabled}
          dark
          disabled
          icon="user"
          inputId={18}
          onChange={() => toggleDisabled(!checkDisabled)}
          text="Disabled"
      />
    </div>
  )
}

export default SelectableIconDark
