import React, { useState } from 'react'
import SelectableIcon from '../_selectable_icon'

const SelectableIconDefault = (props) => {
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
          {...props}
      />

      <SelectableIcon
          checked={checkUnselected}
          icon="euro-sign"
          inputId={11}
          onChange={() => toggleUnselected(!checkUnselected)}
          text="Euro"
          {...props}
      />

      <SelectableIcon
          checked={checkDisabled}
          disabled
          icon="yen-sign"
          inputId={12}
          onChange={() => toggleDisabled(!checkDisabled)}
          text="Yen"
          {...props}
      />
    </div>
  )
}

export default SelectableIconDefault
