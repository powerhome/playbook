import React, { useState } from 'react'
import SelectableCard from '../_selectable_card.jsx'

const SelectableCardDefault = (props) => {
  const [selectedWithIcon, setSelectedWithIcon] = useState(true)
  const [selectedNoIcon, setSelectedNoIcon] = useState(true)
  const [unselected, setUnselected] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <div className="pb--doc-demo-row">

      <SelectableCard
          checked={selectedWithIcon}
          icon
          inputId="selectedWithIcon"
          name="selectedWithIcon"
          onChange={() => setSelectedWithIcon(!selectedWithIcon)}
          value="selectedWithIcon"
          {...props}
      >
        {'Selected, with icon'}
      </SelectableCard>

      <SelectableCard
          checked={selectedNoIcon}
          icon={false}
          inputId="selectedWithoutIcon"
          name="selectedWithoutIcon"
          onChange={() => setSelectedNoIcon(!selectedNoIcon)}
          value="selectedWithoutIcon"
          {...props}
      >
        {'Selected, without icon'}
      </SelectableCard>

      <SelectableCard
          checked={unselected}
          inputId="unselected"
          name="unselected"
          onChange={() => setUnselected(!unselected)}
          value="unselected"
          {...props}
      >
        {'Unselected'}
      </SelectableCard>

      <SelectableCard
          checked={disabled}
          disabled
          inputId="disabled"
          name="disabled"
          onChange={() => setDisabled(!disabled)}
          value="disabled"
          {...props}
      >
        {'Disabled'}
      </SelectableCard>

    </div>
  )
}

export default SelectableCardDefault
