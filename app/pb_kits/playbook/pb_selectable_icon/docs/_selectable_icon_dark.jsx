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
          icon="file-word"
          inputId={16}
          onChange={() => toggleSelected(!checkSelected)}
          text="Doc"
      />

      <SelectableIcon
          checked={checkUnselected}
          dark
          icon="file-pdf"
          inputId={17}
          onChange={() => toggleUnselected(!checkUnselected)}
          text="PDF"
      />

      <SelectableIcon
          checked={checkDisabled}
          dark
          disabled
          icon="file-image"
          inputId={18}
          onChange={() => toggleDisabled(!checkDisabled)}
          text="PNG"
      />
    </div>
  )
}

export default SelectableIconDark
