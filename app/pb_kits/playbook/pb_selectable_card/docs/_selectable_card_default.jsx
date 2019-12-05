import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"


class SelectableCardDefault extends React.Component {
  state = {
    selected_with_icon: true,
    selected_without_icon: true,
    unselected: false
  }

  handleSelect = event => {
    this.setState({
      [event.target.id]: event.target.checked
    })
  }

  render() {
    return (
      <div class="pb--doc-demo-row">

        <SelectableCard
            id="selected_with_icon"
            name="selected_with_icon"
            value="selected_with_icon"
            checked={this.state.selected_with_icon}
            onChange={this.handleSelect}>
          {`Selected, with icon`}
        </SelectableCard>

        <SelectableCard
            id="selected_without_icon"
            name="selected_without_icon"
            value="selected_without_icon"
            icon={false}
            checked={this.state.selected_without_icon}
            onChange={this.handleSelect}>
          {`Selected, without icon`}
        </SelectableCard>

        <SelectableCard
            id="unselected"
            name="unselected"
            value="unselected"
            checked={this.state.unselected}
            onChange={this.handleSelect}>
          {`Unselected`}
        </SelectableCard>

        <SelectableCard
            id="disabled"
            name="disabled"
            value="disabled"
            disabled={true}
            checked={this.state.disabled}
            onChange={this.handleSelect}>
          {`Disabled`}
        </SelectableCard>

      </div>
    )
  }
}

export default SelectableCardDefault;
