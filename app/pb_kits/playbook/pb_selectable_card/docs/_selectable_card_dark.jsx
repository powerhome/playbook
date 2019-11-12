import React from "react"
import SelectableCard from "../_selectable_card.jsx"

function SelectableCardDark() {
  return (
    <div>
      <SelectableCard 
        className={"pb_selectable_card_kit_dark"}
        id={"selectable_card_dark"}
        name={"selectable_card_dark"}
        text={"Selectable Card"}
        value={"1"}
        checked={true}
        dark={true}
      />

      <br></br>

      <SelectableCard 
        className={"pb_selectable_card_kit_dark"}
        id={"selectable_card_dark_2"}
        name={"selectable_card_dark_2"}
        text={"Selectable Card"}
        value={"2"}
        dark={true}
      />
    </div>
  )
}

export default SelectableCardDark;