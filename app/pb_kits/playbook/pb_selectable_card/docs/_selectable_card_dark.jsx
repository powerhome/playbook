import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"

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

      <br></br>

      <SelectableCard 
        className={"pb_selectable_card_kit_dark"}
        id={"selectable_card_dark_3"}
        name={"selectable_card_dark_3"}
        value={"3"}
        dark={true}
        >
        <div>
        <Icon icon={"user"}></Icon>
        </div>
        <div>
        The Content for Selectable Card goes here
        </div>
      </SelectableCard>

     <br></br>

      <SelectableCard 
        className={"pb_selectable_card_kit_dark"}
        id={"selectable_card_dark_3"}
        name={"selectable_card_dark_4"}
        text={"Selectable Card Disabled"}
        value={"4"}
        dark={true}
        disabled={true}
      />
    </div>
  )
}

export default SelectableCardDark;