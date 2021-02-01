import React, { useState } from 'react'
import SelectableCard from '../_selectable_card.jsx'

const SelectableCardSingleSelect = (props) => {
  const [selected, setSelected] = useState(null)
  const handleSelect = (event) => {
    setSelected(event.target.value)
  }

  return (
    <div className="pb--doc-demo-row">

      <SelectableCard
          checked={selected === 'male'}
          inputId="male1"
          multi={false}
          name="gender"
          onChange={handleSelect}
          value="male"
          {...props}
      >
        {'Male'}
      </SelectableCard>

      <SelectableCard
          checked={selected === 'female'}
          inputId="female1"
          multi={false}
          name="gender"
          onChange={handleSelect}
          value="female"
          {...props}
      >
        {'Female'}
      </SelectableCard>

      <SelectableCard
          checked={selected === 'other'}
          inputId="other1"
          multi={false}
          name="gender"
          onChange={handleSelect}
          value="other"
          {...props}
      >
        {'Other'}
      </SelectableCard>

    </div>
  )
}

export default SelectableCardSingleSelect
