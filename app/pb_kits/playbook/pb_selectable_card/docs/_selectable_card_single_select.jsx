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
      <div class="pb--doc-demo-row">

        <SelectableCard
            inputId="male1"
            name="gender"
            value="male"
            multi={false}
            checked={this.state.selected === 'male'}
            onChange={this.handleSelect.bind(this)}>
          {`Male`}
        </SelectableCard>

        <SelectableCard
            inputId="female1"
            name="gender"
            value="female"
            multi={false}
            checked={this.state.selected === 'female'}
            onChange={this.handleSelect.bind(this)}>
          {`Female`}
        </SelectableCard>

        <SelectableCard
            inputId="other1"
            name="gender"
            value="other"
            multi={false}
            checked={this.state.selected === 'other'}
            onChange={this.handleSelect.bind(this)}>
          {`Other`}
        </SelectableCard>
        
      </div>
    );
  }
}

export default SelectableCardSingleSelect;
