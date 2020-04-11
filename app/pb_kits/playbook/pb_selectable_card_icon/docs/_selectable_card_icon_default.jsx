import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconDefault = () => {
  const [selected, setSelected] = useState(true)

  return (
    <div>
      <SelectableCardIcon
          checked={selected}
          className=""
          icon="calendar"
          onChange={() => setSelected(!selected)}
          text="Some text that might explain"
          title="Title"
      />
    </div>
  )
}

export default SelectableCardIconDefault
