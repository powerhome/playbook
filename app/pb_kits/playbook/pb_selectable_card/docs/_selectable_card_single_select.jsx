import React from "react";
import SelectableCard from "../_selectable_card.jsx";

class SelectableCardSingleSelect extends React.Component {
  state = {
    selected: null
  }

  handleSelect = event => {
    this.setState({
      selected: event.target.value
    })
  }

  render() {
    return (
      <div>
        <SelectableCard
            id="male1"
            name="gender"
            value="male"
            multi={false}
            checked={this.state.selected === 'male'}
            onChange={this.handleSelect.bind(this)}
            onSelect={event => console.log(`${event.target.value} selected!`)}
            onUnselect={event => console.log(`${event.target.value} unselected!`)}>
          Male
        </SelectableCard>

        <br></br>

        <SelectableCard
            id="female1"
            name="gender"
            value="female"
            multi={false}
            checked={this.state.selected === 'female'}
            onChange={this.handleSelect.bind(this)}
            onSelect={event => console.log(`${event.target.value} selected!`)}
            onUnselect={event => console.log(`${event.target.value} unselected!`)}>
          Female
        </SelectableCard>

        <br></br>

        <SelectableCard
            id="other1"
            name="gender"
            value="other"
            multi={false}
            checked={this.state.selected === 'other'}
            onChange={this.handleSelect.bind(this)}
            onSelect={event => console.log(`${event.target.value} selected!`)}
            onUnselect={event => console.log(`${event.target.value} unselected!`)}>
          Other
        </SelectableCard>
      </div>
    );
  }
}

export default SelectableCardSingleSelect;
