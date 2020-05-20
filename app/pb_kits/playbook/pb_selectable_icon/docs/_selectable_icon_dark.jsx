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
          icon="cog"
          inputId={16}
          onChange={() => toggleSelected(!checkSelected)}
          text="Settings"
      />

      <SelectableIcon
          checked={checkUnselected}
          dark
          icon="calendar"
          inputId={17}
          onChange={() => toggleUnselected(!checkUnselected)}
          text="Calendar"
      />

      <SelectableIcon
          checked={checkDisabled}
          dark
          disabled
          icon="inbox"
          inputId={18}
          onChange={() => toggleDisabled(!checkDisabled)}
          text="Inbox"
      />
    </div>
  )
}

export default SelectableIconDark
