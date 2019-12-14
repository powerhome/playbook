import React from 'react'
import SelectableCard from '../_selectable_card.jsx'
import Icon from '../../pb_icon/_icon.jsx'

class SelectableCardDefault extends React.Component {
  state = {
    selected_with_icon: true,
    selected_without_icon: true,
    unselected: false,
  }

  handleSelect = (event) => {
    this.setState({
      [event.target.id]: event.target.checked,
    })
  }

  render() {
    return (
      <div className="pb--doc-demo-row">

        <SelectableCard
            checked={this.state.selected_with_icon}
            icon
            inputId="selected_with_icon"
            name="selected_with_icon"
            onChange={this.handleSelect}
            value="selected_with_icon"
        >
          {'Selected, with icon'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.selected_without_icon}
            icon={false}
            inputId="selected_without_icon"
            name="selected_without_icon"
            onChange={this.handleSelect}
            value="selected_without_icon"
        >
          {'Selected, without icon'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.unselected}
            inputId="unselected"
            name="unselected"
            onChange={this.handleSelect}
            value="unselected"
        >
          {'Unselected'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.disabled}
            disabled
            inputId="disabled"
            name="disabled"
            onChange={this.handleSelect}
            value="disabled"
        >
          {'Disabled'}
        </SelectableCard>

      </div>
    )
  }
}

export default SelectableCardDefault
