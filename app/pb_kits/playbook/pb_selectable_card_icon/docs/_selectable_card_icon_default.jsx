import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconDefault = () => {
  const [selectedDefault, setSelectedDefault] = useState(true)

  return (
    <div>
      <SelectableCardIcon
          checked={selectedDefault}
          className=""
          icon="calendar"
          inputId="selectedWithoutIcon"
          name="selectedWithoutIcon"
          onChange={() => setSelectedDefault(!selectedDefault)}
          text="Some text that might explain"
          title="Title"
          value="selectedWithoutIcon"
      />
    </div>
  )
}

export default SelectableCardIconDefault
