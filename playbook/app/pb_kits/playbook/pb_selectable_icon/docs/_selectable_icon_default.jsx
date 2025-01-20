import React, { useState } from 'react'
import SelectableIcon from '../_selectable_icon'

const SelectableIconDefault = ({ dark } ) => {
  const [ checkSelected, toggleSelected ] = useState(true)
  const [ checkUnselected, toggleUnselected ] = useState(false)
  const [ checkDisabled, toggleDisabled ] = useState(false)

  return (

    <div className="pb--doc-demo-row">
      <SelectableIcon
          checked={checkSelected}
          dark={dark}
          icon="dollar-sign"
          inputId={10}
          onChange={() => toggleSelected(!checkSelected)}
          text="US Dollar"
      />

      <SelectableIcon
          checked={checkUnselected}
          dark={dark}
          icon="euro-sign"
          inputId={11}
          onChange={() => toggleUnselected(!checkUnselected)}
          text="Euro"
      />

      <SelectableIcon
          checked={checkDisabled}
          dark={dark}
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
