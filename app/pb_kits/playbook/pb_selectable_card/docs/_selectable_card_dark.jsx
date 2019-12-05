import React from "react"
import SelectableCard from "../_selectable_card.jsx"

class SelectableCardDark extends React.Component {
  state = {
    selected_with_icon_dark: true,
    selected_without_icon_dark: true,
    unselected_dark: false
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
            dark
            inputId="selected_with_icon_dark"
            name="selected_with_icon_dark"
            value="selected_with_icon_dark"
            checked={this.state.selected_with_icon_dark}
            onChange={this.handleSelect}>
          {'Selected, with icon'}
        </SelectableCard>

        <SelectableCard
            dark
            inputId="selected_without_icon_dark"
            name="selected_without_icon_dark"
            value="selected_without_icon_dark"
            icon={false}
            checked={this.state.selected_without_icon_dark}
            onChange={this.handleSelect}>
          {'Selected, without icon'}
        </SelectableCard>

        <SelectableCard
            dark
            inputId="unselected_dark"
            name="unselected_dark"
            value="unselected_dark"
            checked={this.state.unselected_dark}
            onChange={this.handleSelect}>
          {'Unselected'}
        </SelectableCard>

      </div>
    )
  }
}

export default SelectableCardDark;
