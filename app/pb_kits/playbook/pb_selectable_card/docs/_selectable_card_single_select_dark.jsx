import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"

function SelectableCardSingleSelectDark() {
  return (
    <div>
      <SelectableCard 
        className={"pb_selectable_card_kit"}
        id={"selectable_card"}
        name={"selectable_card"}
        value={"1"}
        checked={true}
        dark
      >
        <div>
        Selectable Card 1
        </div>
      </SelectableCard>

      <br></br>

    </div>
  )
}

export default SelectableCardSingleSelectDark;