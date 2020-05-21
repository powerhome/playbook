import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconCheckmark = () => {
  const [selected, setSelected] = useState(true)
  const [unselected, setUnselected] = useState(false)

  return (
    <div className="pb--doc-demo-row">

      <SelectableCardIcon
          bodyText="Howdy Partner."
          checked={selected}
          checkmark
          icon="hat-cowboy"
          inputId={4}
          onChange={() => setSelected(!selected)}
          titleText="Cowboy"
      />
      <SelectableCardIcon
          bodyText="Poof, you're a sandwich."
          checked={unselected}
          checkmark
          icon="hat-wizard"
          inputId={5}
          onChange={() => setUnselected(!unselected)}
          titleText="Wizard"
      />
      <SelectableCardIcon
          bodyText="Where is the lamb sauce?"
          checkmark
          disabled
          icon="hat-chef"
          inputId={6}
          titleText="Chef"
      />
    </div>
  )
}

export default SelectableCardIconCheckmark
