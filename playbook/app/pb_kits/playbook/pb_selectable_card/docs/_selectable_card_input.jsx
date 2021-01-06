import React from 'react'
import {
  Body,
  Image,
  SelectableCard,
} from '../../'

class SelectableCardInput extends React.Component {
  state = {
    firstCheckbox: true,
    secondCheckbox: false,
    radioSelected: "radio-1",
  }

  handleSelect = (event) => {
    console.log(event.target.checked)
    console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.checked,
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
            checked={this.state.firstCheckbox}
            inputId="firstCheckbox"
            name="firstCheckbox"
            onChange={this.handleSelect}
            value="firstCheckbox"
            variant="displayInput"
        >
          <Body>{'This shows the checkbox'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.secondCheckbox}
            inputId="secondCheckbox"
            name="secondCheckbox"
            onChange={this.handleSelect}
            value="secondCheckbox"
            variant="displayInput"
        >
          <Body> Some Text</Body>
        </SelectableCard>
      </div>
      <div className="pb--doc-demo-row">

      <SelectableCard
          checked={this.state.radioSelected === "first"}
          inputId="radio-1"
          multi={false}
          name="radio"
          onChange={this.handleRadioSelect}
          value="first"
          variant="displayInput"
      >
        <Body>{'This shows the radio button'}</Body>
      </SelectableCard>

      <SelectableCard
          checked={this.state.radioSelected === "second"}
          inputId="radio-2"
          multi={false}
          name="radio"
          onChange={this.handleRadioSelect}
          value="second"
          variant="displayInput"
      >
        <Body>
          This has a lot of text to show how it would look.<br/>
          Just wanted to write a bunch and make it wrap.<br/>
          and be really long and I don't know how to write something on the spot.
        </Body>
      </SelectableCard>
    </div>
    </>
    )
  }
}

export default SelectableCardInput
