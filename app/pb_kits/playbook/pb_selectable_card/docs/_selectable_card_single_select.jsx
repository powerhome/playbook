import React from "react"
import SelectableCard from "../_selectable_card.jsx"

class SelectableCardSingleSelect extends React.Component {
  state = {
    selectedCardNumber: "1",
  }

  handleOnSelect = event => {
    const selectedNumber = event.target.value

    //update state
    this.setState({selectedCardNumber: selectedNumber})
  }

  render() {
    const { selectedCardNumber } = this.state

    return (
      <div>
        <SelectableCard
            checked={selectedCardNumber === "1"}
            id="selectable_card_single_select"
            name="selectable_card_single_select"
            onSelect={this.handleOnSelect}
            value="1"
        >
          <div>
            {`Single Selectable Card 1`}
          </div>
        </SelectableCard>

        <br/><br/>

        <SelectableCard
            checked={selectedCardNumber === "2"}
            id="selectable_card_single_select_2"
            name="selectable_card_single_select_2"
            onSelect={this.handleOnSelect}
            value="2"
        >
          <div>
            {`Single Selectable Card 2`}
          </div>
        </SelectableCard>

      </div>
    )
  }
}

export default SelectableCardSingleSelect
