import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconDark = () => {
  const [selected, setSelected] = useState(true)
  const [unselected, setUnselected] = useState(false)

  return (
    <div className="pb--doc-demo-row">
      <SelectableCardIcon
          bodyText="Selected, with icon"
          checked={selected}
          dark
          icon="cog"
          inputId={10}
          onChange={() => setSelected(!selected)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Unselected"
          checked={unselected}
          dark
          icon="inbox"
          inputId={11}
          onChange={() => setUnselected(!unselected)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Disabled"
          dark
          disabled
          icon="cog"
          inputId={12}
          titleText="Title"
      />
    </div>
  )
}

export default SelectableCardIconDark
