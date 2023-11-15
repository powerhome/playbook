import React, { useState } from "react"
import { render, screen } from "../utilities/test-utils"
import SelectableIcon from "./_selectable_icon"

const testId = "selectableIcon"

const SelectableIconMultiSelect = () => {
  const [checkSelected, toggleSelected] = useState(true)
  const [checkUnselected, toggleUnselected] = useState(false)
  const [checkDisabled, toggleDisabled] = useState(false)

  return (
    <>
      <SelectableIcon
        checked={checkSelected}
        className="custom-class"
        data={{ testid: testId }}
        icon="dollar-sign"
        inputId={10}
        onChange={() => toggleSelected(!checkSelected)}
        text="US Dollar"
      />

      <SelectableIcon
        checked={checkUnselected}
        icon="euro-sign"
        inputId={11}
        onChange={() => toggleUnselected(!checkUnselected)}
        text="Euro"
      />

      <SelectableIcon
        checked={checkDisabled}
        disabled
        icon="yen-sign"
        inputId={12}
        onChange={() => toggleDisabled(!checkDisabled)}
        text="Yen"
      />
    </>
  )
}

const SelectableIconSingleSelect = () => {
  const [selectedFormat, toggleFormat] = useState("")

  return (
    <>
      <SelectableIcon
        checked={selectedFormat === "Cassette"}
        icon="cassette-tape"
        inputId={13}
        multi={false}
        name="music-format"
        onChange={() => toggleFormat("Cassette")}
        text="Cassette"
        value="Cassette"
      />

      <SelectableIcon
        checked={selectedFormat === "CD"}
        icon="compact-disc"
        inputId={14}
        multi={false}
        name="music-format"
        onChange={() => toggleFormat("CD")}
        text="CD"
        value="CD"
      />

      <SelectableIcon
        checked={selectedFormat === "Vinyl"}
        icon="album-collection"
        inputId={15}
        multi={false}
        name="music-format"
        onChange={() => toggleFormat("Vinyl")}
        text="Vinyl"
        value="Vinyl"
      />
    </>
  )
}

test("should start with a checked item", () => {
  render(<SelectableIconMultiSelect />)

  const kit = screen.getByLabelText("US Dollar")
  expect(kit).toBeChecked()
})

test("should start with a disabled item", () => {
  render(<SelectableIconMultiSelect />)

  const kit = screen.getByLabelText("Yen")
  expect(kit).toBeDisabled()
})

test("should click and check an item", () => {
  render(<SelectableIconMultiSelect />)

  const kit = screen.getByLabelText("Euro")
  expect(kit).not.toBeChecked()
  kit.click()
  expect(kit).toBeChecked()
})

test("should check multiple items", () => {
  render(<SelectableIconMultiSelect />)

  const usDollarItem = screen.getByLabelText("US Dollar")
  expect(usDollarItem).toBeChecked()

  const euroItem = screen.getByLabelText("Euro")
  expect(euroItem).not.toBeChecked()

  euroItem.click()

  expect(usDollarItem).toBeChecked()
  expect(euroItem).toBeChecked()
})

test("should check single item", () => {
  render(<SelectableIconSingleSelect />)

  const cassetteItem = screen.getByLabelText("Cassette")
  expect(cassetteItem).not.toBeChecked()

  const cdItem = screen.getByLabelText("CD")
  expect(cdItem).not.toBeChecked()

  const vinylItem = screen.getByLabelText("Vinyl")
  expect(vinylItem).not.toBeChecked()

  cassetteItem.click()
  cdItem.click()

  expect(cassetteItem).not.toBeChecked()
  expect(cdItem).toBeChecked()
  expect(vinylItem).not.toBeChecked()
})

test("should render custom class and data", () => {
  render(<SelectableIconMultiSelect />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass("custom-class")
})
