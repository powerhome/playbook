import React from 'react'
import SelectableCard from '../_selectable_card.jsx'

class SelectableCardSingleSelect extends React.Component {
  state = {
    selected: null,
  }

  handleSelect = (event) => {
    this.setState({
      selected: event.target.value,
    })
  }

  render() {
    return (
      <div className="pb--doc-demo-row">

        <SelectableCard
            checked={this.state.selected === 'male'}
            inputId="male1"
            multi={false}
            name="gender"
            onChange={this.handleSelect.bind(this)}
            value="male"
        >
          {'Male'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.selected === 'female'}
            inputId="female1"
            multi={false}
            name="gender"
            onChange={this.handleSelect.bind(this)}
            value="female"
        >
          {'Female'}
        </SelectableCard>

        <SelectableCard
            checked={this.state.selected === 'other'}
            inputId="other1"
            multi={false}
            name="gender"
            onChange={this.handleSelect.bind(this)}
            value="other"
        >
          {'Other'}
        </SelectableCard>

      </div>
    )
  }
}

export default SelectableCardSingleSelect
