import React, { useState } from 'react'
import { render, screen } from '../utilities/test-utils'
import SelectableCard from './_selectable_card'
import { Body, Title, Image } from 'playbook-ui'

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

const SelectableCardSingleSelect = () => {
  const [selected, setSelected] = useState(null)
  const handleSelect = (event) => {
    setSelected(event.target.value)
  }

  return (
    <>
      <SelectableCard
          checked={selected === 'male'}
          inputId="male1"
          multi={false}
          name="gender"
          onChange={handleSelect}
          value="male"
      >
        {'Male'}
      </SelectableCard>

      <SelectableCard
          checked={selected === 'female'}
          inputId="female1"
          multi={false}
          name="gender"
          onChange={handleSelect}
          value="female"
      >
        {'Female'}
      </SelectableCard>

      <SelectableCard
          checked={selected === 'other'}
          inputId="other1"
          multi={false}
          name="gender"
          onChange={handleSelect}
          value="other"
      >
        {'Other'}
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

test('should check only single item', () => {
  render(<SelectableCardSingleSelect/>)

  const male = screen.getByLabelText('Male')
  expect(male).not.toBeChecked

  const female = screen.getByLabelText('Female')
  expect(female).not.toBeChecked

  const other = screen.getByLabelText('Other')
  expect(other).not.toBeChecked

  male.click()
  other.click()

  expect(male).not.toBeChecked
  expect(female).not.toBeChecked
  expect(other).toBeChecked
})

test('should have text passed through the text prop', () => {
  render (<SelectableCard text="This passes text through the tag"/>)

  expect(screen.getByText("This passes text through the tag")).toBeInTheDocument()
})

test('should pass block content', () => {
  render (<SelectableCard>
            <Title
                size={4}
                text="Block"
            />
            <Body
                tag="span"
            >
              {'This uses block'}
            </Body>
          </SelectableCard>
        )
  expect(screen.getByText("This uses block")).toBeInTheDocument()
})

test('should pass image inside card content', () => {
  render (<SelectableCard>
            <Image
                rounded
                size="xl"
                url="https://unsplash.it/500/400/?image=634"
            />
          </SelectableCard>
        )
  const dispalyedImg = document.querySelector("img")

  expect(dispalyedImg.src).toContain("image=634")
})
