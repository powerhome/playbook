import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import SelectableCard from '../../pb_selectable_card/_selectable_card'
import Title from '../../pb_title/_title'
import Caption from '../../pb_caption/_caption'
import Card from '../../pb_card/_card'
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
      <Title text="PLAY-2880 CSB temporary doc example"/>
      <Caption marginY="sm"
          text="Input Variant Checkbox Examples - Light Mode"
          {...props}
      />
      <SelectableCard
          checked={state.firstCheckbox}
          disabled
          inputId="firstCheckbox"
          name="firstCheckbox"
          onChange={handleSelect}
          value="firstCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{"Disabled + checked"}</Body>
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
        <Body {...props}>{"Clickable + checked initially"}</Body>
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
        <Body {...props}>{"Clickable + unchecked initially"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.fourthCheckbox}
          disabled
          inputId="fourthCheckbox"
          name="fourthCheckbox"
          onChange={handleSelect}
          value="fourthCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{"Disabled + unchecked"}</Body>
      </SelectableCard>
      <Caption marginY="sm"
          text="Input Variant Radio Examples - Light Mode"
          {...props}
      />
      <SelectableCard
          checked={state.radioSelected === "first"}
          disabled
          inputId="radio-1"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="first"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{"Disabled + checked initially"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.radioSelected === "second"}
          inputId="radio-2"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="second"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{"Selectable"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.radioSelected === "third"}
          inputId="radio-3"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="third"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{"Selectable"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.radioSelected === "fourth"}
          disabled
          inputId="radio-4"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="fourth"
          variant="displayInput"
          {...props}
      >
        <Body {...props}>{"Disabled + unchecked"}</Body>
      </SelectableCard>
      <Card dark>
      <Caption dark
          marginY="sm"
          text="Input Variant Checkbox Examples - Dark Mode"
          {...props}
      />
      <SelectableCard
          checked={state.firstCheckbox}
          dark
          disabled
          inputId="firstCheckbox"
          name="firstCheckbox"
          onChange={handleSelect}
          value="firstCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body dark>{"Disabled + checked"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.secondCheckbox}
          dark
          inputId="secondCheckbox"
          name="secondCheckbox"
          onChange={handleSelect}
          value="secondCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body dark>{"Clickable + checked initially"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.thirdCheckbox}
          dark
          inputId="thirdCheckbox"
          name="thirdCheckbox"
          onChange={handleSelect}
          value="thirdCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body dark>{"Clickable + unchecked initially"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.fourthCheckbox}
          dark
          disabled
          inputId="fourthCheckbox"
          name="fourthCheckbox"
          onChange={handleSelect}
          value="fourthCheckbox"
          variant="displayInput"
          {...props}
      >
        <Body dark>{"Disabled + unchecked"}</Body>
      </SelectableCard>
      <Caption dark
          marginY="sm"
          text="Input Variant Radio Examples - Dark Mode"
          {...props}
      />
      <SelectableCard
          checked={state.radioSelected === "first"}
          dark
          disabled
          inputId="radio-1"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="first"
          variant="displayInput"
          {...props}
      >
        <Body dark>{"Disabled + checked initially"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.radioSelected === "second"}
          dark
          inputId="radio-2"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="second"
          variant="displayInput"
          {...props}
      >
        <Body dark>{"Selectable"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.radioSelected === "third"}
          dark
          inputId="radio-3"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="third"
          variant="displayInput"
          {...props}
      >
        <Body dark>{"Selectable"}</Body>
      </SelectableCard>
      <SelectableCard
          checked={state.radioSelected === "fourth"}
          dark
          disabled
          inputId="radio-4"
          multi={false}
          name="radio"
          onChange={handleRadioSelect}
          value="fourth"
          variant="displayInput"
          {...props}
      >
        <Body dark>{"Disabled + unchecked"}</Body>
      </SelectableCard>
      </Card>
    </>
  )
}

export default SelectableCardInput
