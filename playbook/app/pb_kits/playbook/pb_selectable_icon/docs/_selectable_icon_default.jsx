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
          icon="dollar-sign"
          inputId={10}
          onChange={() => toggleSelected(!checkSelected)}
          text="US Dollar"
      />

      <SelectableIcon
          checked={checkUnselected}
          icon="euro-sign"
          inputId={11}
          onChange={() => toggleUnselected(!checkUnselected)}
          text="Euro"
      />

      <SelectableIcon
          checked={checkDisabled}
          disabled
          icon="yen-sign"
          inputId={12}
          onChange={() => toggleDisabled(!checkDisabled)}
          text="Yen"
      />
    </div>
  )
}

export default SelectableIconDefault
