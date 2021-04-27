import React, { useState } from 'react'
import {
  Body,
  SelectableCard,
  Title,
} from '../../'

const SelectableCardInput = (props) => {
  const [state, setState] = useState({
    firstCheckbox: true,
    secondCheckbox: true,
    thirdCheckbox: false,
    forthCheckbox: false,
    radioSelected: 'first',
  })

  const handleSelect = (event) => {
    setState({ ...state,
      [event.target.name]: event.target.checked,
    })
  }

  const handleRadioSelect = (event) => {
    setState({
      ...state,
      radioSelected: event.target.value,
    })
  }

  return (
    <>
      <Title
          size={3}
          text="What programming languages do you know?"
          {...props}
      />

      <br />

      <SelectableCard
          checked={state.firstCheckbox}
          inputId="firstCheckbox"
          name="firstCheckbox"
          onChange={handleSelect}
          value="firstCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{'Ruby'}</Body>
      </SelectableCard>

      <SelectableCard
          checked={state.secondCheckbox}
          inputId="secondCheckbox"
          name="secondCheckbox"
          onChange={handleSelect}
          value="secondCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{'JavaScript'}</Body>
      </SelectableCard>

      <SelectableCard
          checked={state.thirdCheckbox}
          inputId="thirdCheckbox"
          name="thirdCheckbox"
          onChange={handleSelect}
          value="thirdCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{'TypeScript'}</Body>
      </SelectableCard>

      <SelectableCard
          checked={state.fourthCheckbox}
          inputId="fourthCheckbox"
          name="fourthCheckbox"
          onChange={handleSelect}
          value="fourthCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{'Swift'}</Body>
      </SelectableCard>

      <br />

      <Title
          size={3}
          text="How likely are you to recommend Playbook to a friend?"
          {...props}
      />

      <br />

      <SelectableCard
          checked={state.radioSelected === 'first'}
          inputId="radio-1"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="first"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{'5'}</Body>
      </SelectableCard>

      <SelectableCard
          checked={state.radioSelected === 'second'}
          inputId="radio-2"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="second"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>
          {'4'}
        </Body>
      </SelectableCard>

      <SelectableCard
          checked={state.radioSelected === 'third'}
          inputId="radio-3"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="third"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{'3'}</Body>
      </SelectableCard>

      <SelectableCard
          checked={state.radioSelected === 'fourth'}
          inputId="radio-4"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="fourth"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{'2'}</Body>
      </SelectableCard>

      <SelectableCard
          checked={state.radioSelected === 'fifth'}
          inputId="radio-5"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="fifth"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{'1'}</Body>
      </SelectableCard>
    </>
  )
}

export default SelectableCardInput
