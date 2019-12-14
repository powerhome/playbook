import React from 'react'
import SelectableCard from '../_selectable_card.jsx'

class SelectableCardDefault extends React.Component {
  state = {
    selectedWithIcon: true,
    selectedWithoutIcon: true,
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
            checked={this.state.selectedWithIcon}
            icon
            inputId="selectedWithIcon"
            name="selectedWithIcon"
            onChange={this.handleSelect}
            value="selectedWithIcon"
        >
          {'Selected, with icon'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.selectedWithoutIcon}
            icon={false}
            inputId="selectedWithoutIcon"
            name="selectedWithoutIcon"
            onChange={this.handleSelect}
            value="selectedWithoutIcon"
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
