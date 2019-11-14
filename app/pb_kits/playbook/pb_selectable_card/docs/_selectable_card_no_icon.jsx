import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"


class SelectableCardNoIcon extends React.Component {
  state = {
    sandals: true,
    sneakers: false,
    boots: false
  }

  handleSelect = event => {
    this.setState({
      [event.target.id]: event.target.checked
    })
  }

  render() {
    return (
      <div>
        <SelectableCard
            id="sandals"
            name="sandals"
            value="sandals"
            icon={false}
            checked={this.state.sandals}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I have sandals
        </SelectableCard>

        <br></br>

        <SelectableCard
            id="sneakers"
            name="sneakers"
            value="sneakers"
            icon={false}
            checked={this.state.sneakers}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I have sneakers
        </SelectableCard>

        <br></br>

        <SelectableCard
            id="boots"
            name="boots"
            value="boots"
            icon={false}
            checked={this.state.boots}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I have boots
        </SelectableCard>
      </div>
    )
  }
}

export default SelectableCardNoIcon;
