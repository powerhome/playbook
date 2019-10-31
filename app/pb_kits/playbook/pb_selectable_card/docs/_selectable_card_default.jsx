import React from "react"
import SelectableCard from "../_selectable_card.jsx"

function SelectableCardDefault() {
  return (
    <div>
      <SelectableCard>
        {'Selectable Card'}
      </SelectableCard>
      <br/>
      <SelectableCard selected>{'Selected Card'}
      </SelectableCard>
    </div>
  )
}

export default SelectableCardDefault;
