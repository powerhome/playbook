import React from "react"
import SelectableCard from "../_selectable_card.jsx"

function SelectableCardDefault() {
  return (
    <div>
      <SelectableCard 
        className={"pb_selectable_card_kit"}
        id={"selectable_card"}
        name={"selectable_card"}
        text={"Selectable Card"}
      />
    </div>
  )
}

export default SelectableCardDefault;
