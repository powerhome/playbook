import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconCheckmark = () => {
  const [selected, setSelected] = useState(true)
  const [unselected, setUnselected] = useState(false)

  return (
    <div className="pb--doc-demo-row">

      <SelectableCardIcon
          bodyText="Selected, without icon"
          checked={selected}
          checkmark
          icon="calendar"
          inputId={4}
          onChange={() => setSelected(!selected)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Unselected"
          checked={unselected}
          checkmark
          icon="inbox"
          inputId={5}
          onChange={() => setUnselected(!unselected)}
          titleText="Title"
      />
      <SelectableCardIcon
          bodyText="Disabled"
          checkmark
          disabled
          icon="cog"
          inputId={6}
          titleText="Title"
      />
    </div>
  )
}

export default SelectableCardIconCheckmark
