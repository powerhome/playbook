import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"

function SelectableCardSingleSelect() {
  return (
    <div>
      <SelectableCard 
        id={"selectable_card_single_select"}
        name={"selectable_card_single_select"}
        value={"1"}
        multi={false}
        checked={true}
      >
        <div>
        Single Selectable Card 1
        </div>
      </SelectableCard>

      <br></br>

      <SelectableCard 
        id={"selectable_card_single_select"}
        name={"selectable_card_single_select"}
        value={"2"}
        multi={false}
      >
        <div>
        Single Selectable Card 2
        </div>
      </SelectableCard>

    </div>
  )
}

export default SelectableCardSingleSelect;