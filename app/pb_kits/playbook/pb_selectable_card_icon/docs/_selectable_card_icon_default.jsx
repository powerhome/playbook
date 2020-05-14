import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconDefault = () => {
  const [selectedIcon, setSelectedIcon] = useState(true)
  const [selectedWithoutIcon, setSelectedWithoutIcon] = useState(true)
  const [unselected, setUnselected] = useState(true)

  return (
    <div className="pb--doc-demo-row">
      <SelectableCardIcon
          bodyText="Selected, with icon"
          cardIcon
          checked={selectedIcon}
          icon="calendar"
          inputId={1}
          onChange={() => setSelectedIcon(!selectedIcon)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Selected, without icon"
          checked={selectedWithoutIcon}
          icon="calendar"
          inputId={2}
          onChange={() => setSelectedWithoutIcon(!selectedWithoutIcon)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Unselected"
          checked={unselected}
          icon="calendar"
          inputId={3}
          onChange={() => setUnselected(!unselected)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Disabled"
          disabled
          icon="calendar"
          inputId={4}
          titleText="Title"
      />
    </div>
  )
}

export default SelectableCardIconDefault
