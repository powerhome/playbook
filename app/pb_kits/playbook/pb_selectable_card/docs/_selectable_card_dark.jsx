import React from 'react'
import SelectableCard from '../_selectable_card.jsx'

class SelectableCardDark extends React.Component {
  state = {
    selectedWithIconDark: true,
    selectedWithoutIconDark: true,
    unselectedDark: false,
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
            checked={this.state.selectedWithIconDark}
            dark
            icon
            inputId="selectedWithIconDark"
            name="selectedWithIconDark"
            onChange={this.handleSelect}
            value="selectedWithIconDark"
        >
          {'Selected, with icon'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.selectedWithoutIconDark}
            dark
            icon={false}
            inputId="selectedWithoutIconDark"
            name="selectedWithoutIconDark"
            onChange={this.handleSelect}
            value="selectedWithoutIconDark"
        >
          {'Selected, without icon'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.unselectedDark}
            dark
            inputId="unselectedDark"
            name="unselectedDark"
            onChange={this.handleSelect}
            value="unselectedDark"
        >
          {'Unselected'}
        </SelectableCard>

        <SelectableCard
            dark
            disabled
            inputId="disabled_dark"
            name="disabled_dark"
            onChange={this.handleSelect}
            value="disabled_dark"
        >
          {'Unselected'}
        </SelectableCard>

      </div>
    )
  }
}

export default SelectableCardDark
