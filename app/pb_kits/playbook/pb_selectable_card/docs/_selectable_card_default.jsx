import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"


function SelectableCardDefault() {
  return (
    <div>
      <SelectableCard 
        id={"selectable_card"}
        name={"selectable_card"}
        value={"1"}
        checked={true}
      >
        <div>
        Selectable Card 1
        </div>
      </SelectableCard>

      <br></br>

      <SelectableCard 
        className={"pb_selectable_card_kit"}
        id={"selectable_card_2"}
        name={"selectable_card_2"}
        value={"2"}
      >
        <div>
        Selectable Card 2
        </div>
      </SelectableCard>

      <br></br>

      <SelectableCard 
        className={"pb_selectable_card_kit"}
        id={"selectable_card_3"}
        name={"selectable_card_3"}
        value={"3"}
      >
        <div>
        <Icon icon={"user"}></Icon>
        </div>
        <div>
          Selectable Card Content goes here
        </div>
      </SelectableCard>

      <br></br>

      <SelectableCard 
        className={"pb_selectable_card_kit"}
        id={"selectable_card_4"}
        name={"selectable_card_4"}
        text={"Selectable Card Disabled"}
        value={"4"}
        disabled={true}
      >
        <div>
          Selectable Card Disabled
        </div>
      </SelectableCard>

      <br></br>
    </div>
  )
}

export default SelectableCardDefault;
