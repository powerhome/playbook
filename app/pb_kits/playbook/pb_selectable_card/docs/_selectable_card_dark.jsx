import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"


class SelectableCardDark extends React.Component {
  state = {
    pizza: true,
    hamburgers: false,
    apples: false
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
            dark
            id="pizza"
            name="pizza"
            value="pizza"
            checked={this.state.pizza}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I love pizza
        </SelectableCard>

        <br></br>

        <SelectableCard
            dark
            id="hamburgers"
            name="hamburgers"
            value="hamburgers"
            checked={this.state.hamburgers}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I love hamburgers
        </SelectableCard>

        <br></br>

        <SelectableCard
            dark
            id="apples"
            name="apples"
            value="apples"
            checked={this.state.apples}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I love apples
        </SelectableCard>
      </div>
    )
  }
}

export default SelectableCardDark;
