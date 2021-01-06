import React from 'react'
import {
  Body,
  Image,
  SelectableCard,
} from '../../'

class SelectableCardInput extends React.Component {
  state = {
    selectedInput: true,
    unselectedInput: false,
    radioSelected: "radio-1",
  }

  handleSelect = (event) => {
    this.setState({
      [event.target.id]: event.target.checked,
    })
  }

  handleRadioSelect = (event) => {
    this.setState({
      radioSelected: event.target.value,
    })
  }

  render() {
    return (
      <>
      <div className="pb--doc-demo-row">

        <SelectableCard
            checked={this.state.selectableInput}
            inputId="selectedInput"
            name="selectedInput"
            onChange={this.handleSelect}
            value="selectedInput"
            variant="displayInput"
        >
          <Body>{'This shows the checkbox'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.unselectedInput}
            inputId="unselectedInput"
            name="unselectedInput"
            onChange={this.handleSelect}
            value="unselectedInput"
            variant="displayInput"
        >
          <Body> Some Text</Body>
        </SelectableCard>
      </div>
      <div className="pb--doc-demo-row">

      <SelectableCard
          inputId="radio-1"
          multi={false}
          name="radio"
          onChange={this.handleSelect}
          value="first"
          variant="displayInput"
      >
        <Body>{'This shows the radio button'}</Body>
      </SelectableCard>

      <SelectableCard
          checked={false}
          inputId="radio-2"
          multi={false}
          name="radio"
          onChange={this.handleRadioSelect}
          value="second"
          variant="displayInput"
      >
        <Body> Some Text</Body>
      </SelectableCard>
    </div>
    </>
    )
  }
}

export default SelectableCardInput
