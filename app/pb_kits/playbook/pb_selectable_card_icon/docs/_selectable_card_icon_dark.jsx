import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconDark = () => {
  const [selectedIcon, setSelectedIcon] = useState(true)
  const [selectedWithoutIcon, setSelectedWithoutIcon] = useState(true)
  const [unselected, setUnselected] = useState(false)

  return (
    <div className="pb--doc-demo-row">
      <SelectableCardIcon
          bodyText="Selected, with icon"
          cardIcon
          checked={selectedIcon}
          dark
          icon="cog"
          inputId={8}
          onChange={() => setSelectedIcon(!selectedIcon)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Selected, without icon"
          checked={selectedWithoutIcon}
          dark
          icon="calendar"
          inputId={9}
          onChange={() => setSelectedWithoutIcon(!selectedWithoutIcon)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Unselected"
          checked={unselected}
          dark
          icon="inbox"
          inputId={10}
          onChange={() => setUnselected(!unselected)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Disabled"
          dark
          disabled
          icon="cog"
          inputId={11}
          titleText="Title"
      />
    </div>
  )
}

export default SelectableCardIconDark
