import React, { useState } from 'react'

import SelectableCardIcon from '../_selectable_card_icon'

const SelectableCardIconSingleSelect = (props) => {
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
          {...props}
      />
      <SelectableCardIcon
          checked={selectedFormat === 'bus'}
          icon="bus"
          inputId={8}
          name="select"
          onChange={() => toggleFormat('bus')}
          titleText="Bus"
          value="bus"
          {...props}
      />
      <SelectableCardIcon
          checked={selectedFormat === 'subway'}
          icon="subway"
          inputId={9}
          name="select"
          onChange={() => toggleFormat('subway')}
          titleText="Subway"
          value="subway"
          {...props}
      />
    </div>
  )
}

export default SelectableCardIconSingleSelect
