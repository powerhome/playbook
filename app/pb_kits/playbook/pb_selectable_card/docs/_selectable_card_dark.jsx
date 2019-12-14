import React from 'react'
import SelectableCard from '../_selectable_card.jsx'

class SelectableCardDark extends React.Component {
  state = {
    selected_with_icon_dark: true,
    selected_without_icon_dark: true,
    unselected_dark: false,
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
            checked={this.state.selected_with_icon_dark}
            dark
            icon
            inputId="selected_with_icon_dark"
            name="selected_with_icon_dark"
            onChange={this.handleSelect}
            value="selected_with_icon_dark"
        >
          {'Selected, with icon'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.selected_without_icon_dark}
            dark
            icon={false}
            inputId="selected_without_icon_dark"
            name="selected_without_icon_dark"
            onChange={this.handleSelect}
            value="selected_without_icon_dark"
        >
          {'Selected, without icon'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.unselected_dark}
            dark
            inputId="unselected_dark"
            name="unselected_dark"
            onChange={this.handleSelect}
            value="unselected_dark"
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
