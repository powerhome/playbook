import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconDark = () => {
  const [selectedDark, setSelectedDark] = useState(true)

  return (
    <div>
      <SelectableCardIcon
          checked={selectedDark}
          className=""
          dark
          icon="calendar"
          inputId="selectedWithoutIconDark"
          name="selectedWithoutIconDark"
          onChange={() => setSelectedDark(!selectedDark)}
          text="Some text that might explain"
          title="Title"
          value="selectedWithoutIconDark"
      />
    </div>
  )
}

export default SelectableCardIconDark
