import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"


class SelectableCardDefault extends React.Component {
  state = {
    car: true,
    bike: false,
    boat: false
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
            id="car"
            name="car"
            value="car"
            checked={this.state.car}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I have a car
        </SelectableCard>

        <br></br>

        <SelectableCard
            id="bike"
            name="bike"
            value="bike"
            checked={this.state.bike}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I have a bike
        </SelectableCard>

        <br></br>

        <SelectableCard
            id="boat"
            name="boat"
            value="boat"
            checked={this.state.boat}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I have a boat
        </SelectableCard>
      </div>
    )
  }
}

export default SelectableCardDefault;
