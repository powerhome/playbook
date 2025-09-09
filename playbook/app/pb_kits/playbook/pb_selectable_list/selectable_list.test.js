import React from 'react'
import { render, screen } from '../utilities/test-utils'
import SelectableList from './_selectable_list'

const testId = "selectable-list-test"

const SelectableListCheckbox = () => {
    return (
      <SelectableList 
          data={{ testid: testId }} 
          variant="checkbox">
        <SelectableList.Item
            label="Mild"
            name="checkbox-name-1"
            value="1"
        />
        <SelectableList.Item
            checked
            label="Medium"
            name="checkbox-name-2"
            value="2"
        />
      </SelectableList>
    )
}

const SelectableListRadio = () => {
    return (
        <SelectableList
            data={{ testid: testId }}
            variant="radio">
        <SelectableList.Item
            label="Small"
            name="radio"
            value="1"
        />
        <SelectableList.Item
            label="Medium"
            name="radio"
            value="2"
        />
      </SelectableList>
    )
}


test("classname renders as expected", () => {
   render(<SelectableListCheckbox />)

   const kit = screen.getByTestId("selectable-list-test")
   expect(kit).toHaveClass("pb_selectable_list_kit")
})

test("renders variant checkbox", () => {
    render(<SelectableListCheckbox />)
    const kit = screen.getByTestId("selectable-list-test")
    const checkbox = kit.querySelector(".pb_checkbox_kit")
    expect(checkbox).toBeInTheDocument()
})

test("renders variant radio", () => {
    render(<SelectableListRadio />)
    const kit = screen.getByTestId("selectable-list-test")
    const radio = kit.querySelector("input[type='radio']")
    expect(radio).toBeInTheDocument()

})
