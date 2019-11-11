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
        value={"1"}
        checked={true}
      />

      <br></br>

      <SelectableCard 
        className={"pb_selectable_card_kit"}
        id={"selectable_card_2"}
        name={"selectable_card_2"}
        text={"Selectable Card"}
        value={"2"}
      />
    </div>
  )
}

export default SelectableCardDefault;
