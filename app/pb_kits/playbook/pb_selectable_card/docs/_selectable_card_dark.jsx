import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"

function SelectableCardDark() {
  return (
    <div>
      <SelectableCard 
        id={"selectable_card_dark"}
        name={"selectable_card_dark"}
        value={"1"}
        checked={true}
        dark
      >
       <div>
        Selectable Card 1
       </div>   
      </SelectableCard>

      <br></br>

      <SelectableCard 
        id={"selectable_card_dark_2"}
        name={"selectable_card_dark_2"}
        value={"2"}
        dark={true}
        >
        <div>
        Selectable Card 2
        </div>
        </SelectableCard>

      <br></br>

      <SelectableCard
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
        id={"selectable_card_dark_4"}
        name={"selectable_card_dark_4"}
        value={"4"}
        dark={true}
        disabled={true}
      >
        <div>
          Selectable Card Disabled
        </div>
      </SelectableCard>
    </div>
  )
}

export default SelectableCardDark;