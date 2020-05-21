import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconDark = () => {
  const [selected, setSelected] = useState(true)
  const [unselected, setUnselected] = useState(false)

  return (
    <div className="pb--doc-demo-row">
      <SelectableCardIcon
          bodyText="Silent Mode"
          checked={selected}
          dark
          icon="volume"
          inputId={10}
          onChange={() => setSelected(!selected)}
          titleText="Sound"
      />
      <SelectableCardIcon
          bodyText="Allow location data"
          checked={unselected}
          dark
          icon="location"
          inputId={11}
          onChange={() => setUnselected(!unselected)}
          titleText="Location"
      />
      <SelectableCardIcon
          bodyText="Disabled"
          dark
          disabled
          icon="wifi"
          inputId={12}
          titleText="WiFi"
      />
    </div>
  )
}

export default SelectableCardIconDark
