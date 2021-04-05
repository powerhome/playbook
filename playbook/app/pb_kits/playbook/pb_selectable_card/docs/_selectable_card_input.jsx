import React from 'react'
import {
  Body,
  SelectableCard,
  Title,
} from '../../'

class SelectableCardInput extends React.Component {
  state = {
    firstCheckbox: true,
    secondCheckbox: true,
    thirdCheckbox: false,
    forthCheckbox: false,
    radioSelected: 'first',
  }

  handleSelect = (event) => {
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
        <Title
            size={3}
            text="What programming languages do you know?"
        />

        <br />

        <SelectableCard
            checked={this.state.firstCheckbox}
            inputId="firstCheckbox"
            name="firstCheckbox"
            onChange={this.handleSelect}
            value="firstCheckbox"
            variant="displayInput"
        >
          <Body>{'Ruby'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.secondCheckbox}
            inputId="secondCheckbox"
            name="secondCheckbox"
            onChange={this.handleSelect}
            value="secondCheckbox"
            variant="displayInput"
        >
          <Body>{'JavaScript'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.thirdCheckbox}
            inputId="thirdCheckbox"
            name="thirdCheckbox"
            onChange={this.handleSelect}
            value="thirdCheckbox"
            variant="displayInput"
        >
          <Body>{'TypeScript'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.fourthCheckbox}
            inputId="fourthCheckbox"
            name="fourthCheckbox"
            onChange={this.handleSelect}
            value="fourthCheckbox"
            variant="displayInput"
        >
          <Body>{'Swift'}</Body>
        </SelectableCard>

        <br />

        <Title
            size={3}
            text="How likely are you to recommend Playbook to a friend?"
        />

        <br />

        <SelectableCard
            checked={this.state.radioSelected === 'first'}
            inputId="radio-1"
            multi={false}
            name="radio"
            onChange={this.handleRadioSelect}
            value="first"
            variant="displayInput"
        >
          <Body>{'5'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.radioSelected === 'second'}
            inputId="radio-2"
            multi={false}
            name="radio"
            onChange={this.handleRadioSelect}
            value="second"
            variant="displayInput"
        >
          <Body>
            {'4'}
          </Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.radioSelected === 'third'}
            inputId="radio-3"
            multi={false}
            name="radio"
            onChange={this.handleRadioSelect}
            value="third"
            variant="displayInput"
        >
          <Body>{'3'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.radioSelected === 'fourth'}
            inputId="radio-4"
            multi={false}
            name="radio"
            onChange={this.handleRadioSelect}
            value="fourth"
            variant="displayInput"
        >
          <Body>{'2'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.radioSelected === 'fifth'}
            inputId="radio-5"
            multi={false}
            name="radio"
            onChange={this.handleRadioSelect}
            value="fifth"
            variant="displayInput"
        >
          <Body>{'1'}</Body>
        </SelectableCard>
      </>
    )
  }
}

export default SelectableCardInput
