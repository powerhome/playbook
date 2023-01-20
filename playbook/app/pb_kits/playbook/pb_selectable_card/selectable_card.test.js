import React, { useState } from 'react'
import { render, screen } from '../utilities/test-utils'
import SelectableCard from './_selectable_card'

const SelectableCardMultiSelect = () => {
  const [selected, setSelected] = useState(true)
  const [unselected, setUnselected] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <>
      <SelectableCard
          checked={selected}
          inputId="selected"
          name="selected"
          onChange={() => setSelected(!selected)}
          value="selected"
      >
        {'Selected'}
      </SelectableCard>

      <SelectableCard
          checked={unselected}
          inputId="unselected"
          name="unselected"
          onChange={() => setUnselected(!unselected)}
          value="unselected"
      >
        {'Unselected'}
      </SelectableCard>

      <SelectableCard
          checked={disabled}
          disabled
          inputId="disabled"
          name="disabled"
          onChange={() => setDisabled(!disabled)}
          value="disabled"
      >
        {'Disabled'}
      </SelectableCard>

    </>
  )
}

test('should start with a checked item', () => {
  render(<SelectableCardMultiSelect />)

  const kit = screen.getByLabelText('Selected')
  expect(kit).toBeChecked()
})

test('should start with a disabled item', () => {
  render(<SelectableCardMultiSelect />)

  const kit = screen.getByLabelText('Disabled')
  expect(kit).toBeDisabled()
})

test('should click and check an item', () => {
  render(<SelectableCardMultiSelect />)

  const kit = screen.getByLabelText('Unselected')
  expect(kit).not.toBeChecked()
  kit.click()
  expect(kit).toBeChecked()
})

test('should check multiple items', () => {
  render(<SelectableCardMultiSelect />)

  const checkedItem = screen.getByLabelText('Selected')
  expect(checkedItem).toBeChecked()

  const uncheckedItem = screen.getByLabelText('Unselected')
  expect(uncheckedItem).not.toBeChecked()

  uncheckedItem.click()

  expect(checkedItem).toBeChecked
  expect(uncheckedItem).toBeChecked

})