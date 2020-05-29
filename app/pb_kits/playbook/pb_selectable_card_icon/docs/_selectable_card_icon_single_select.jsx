import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconSingleSelect = () => {
  const [selectedFormat, toggleFormat] = useState(null)

  return (
    <div className="pb--doc-demo-row">
      <SelectableCardIcon
          checked={selectedFormat === 'car'}
          icon="car"
          inputId={7}
          name="select"
          onChange={() => toggleFormat('car')}
          titleText="Car"
          value="car"
      />
      <SelectableCardIcon
          checked={selectedFormat === 'bus'}
          icon="bus"
          inputId={8}
          name="select"
          onChange={() => toggleFormat('bus')}
          titleText="Bus"
          value="bus"
      />
      <SelectableCardIcon
          checked={selectedFormat === 'subway'}
          icon="subway"
          inputId={9}
          name="select"
          onChange={() => toggleFormat('subway')}
          titleText="Subway"
          value="subway"
      />
    </div>
  )
}

export default SelectableCardIconSingleSelect
